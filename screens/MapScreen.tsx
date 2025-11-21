import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');

interface PointOfInterest {
  id: string;
  title: string;
  description: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  type: 'music' | 'venue' | 'landmark';
}

interface MapScreenProps {
  onClose?: () => void;
}

export const MapScreen: React.FC<MapScreenProps> = ({ onClose }) => {
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [watchSubscription, setWatchSubscription] = useState<Location.LocationSubscription | null>(null);
  const [geofenceAlerts, setGeofenceAlerts] = useState<string[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const webViewRef = useRef<WebView>(null);
  const insets = useSafeAreaInsets();

  // Mock points of interest (Spotify-themed locations)
  const pointsOfInterest: PointOfInterest[] = [
    {
      id: '1',
      title: 'Spotify Headquarters',
      description: 'Main office location',
      coordinate: {
        latitude: 40.7589,
        longitude: -73.9851,
      },
      type: 'music',
    },
    {
      id: '2',
      title: 'Music Venue',
      description: 'Live music hotspot',
      coordinate: {
        latitude: 40.7614,
        longitude: -73.9776,
      },
      type: 'venue',
    },
    {
      id: '3',
      title: 'Recording Studio',
      description: 'Professional recording facility',
      coordinate: {
        latitude: 40.7505,
        longitude: -73.9934,
      },
      type: 'landmark',
    },
  ];

  useEffect(() => {
    requestLocationPermission();
    return () => {
      if (watchSubscription) {
        watchSubscription.remove();
      }
    };
  }, []);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required to show your location on the map.');
        // Default to a location (e.g., New York)
        setUserLocation({ latitude: 40.7589, longitude: -73.9851 });
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = location.coords;
      setUserLocation({ latitude, longitude });

      // Start watching location for geofencing
      startLocationWatching();
    } catch (error) {
      Alert.alert('Location Error', 'Unable to get your location. Using default location.');
      // Default to a location (e.g., New York)
      setUserLocation({ latitude: 40.7589, longitude: -73.9851 });
      startLocationWatching();
    }
  };

  const startLocationWatching = async () => {
    try {
      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 10, // Update every 10 meters
          timeInterval: 5000, // Check every 5 seconds
        },
        (location) => {
          const { latitude, longitude } = location.coords;
          setUserLocation({ latitude, longitude });
          checkGeofences(latitude, longitude);
          
          // Update map with new location
          if (webViewRef.current && mapLoaded) {
            const script = `
              updateUserLocation(${latitude}, ${longitude});
              true;
            `;
            webViewRef.current.injectJavaScript(script);
          }
        }
      );
      setWatchSubscription(subscription);
    } catch (error) {
      console.error('Location watch error:', error);
    }
  };

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371000; // Earth's radius in meters
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const checkGeofences = (userLat: number, userLon: number) => {
    const GEOFENCE_RADIUS = 100; // 100 meters

    pointsOfInterest.forEach((poi) => {
      const distance = calculateDistance(
        userLat,
        userLon,
        poi.coordinate.latitude,
        poi.coordinate.longitude
      );

      if (distance <= GEOFENCE_RADIUS) {
        const alertKey = `entered_${poi.id}`;
        if (!geofenceAlerts.includes(alertKey)) {
          setGeofenceAlerts([...geofenceAlerts, alertKey]);
          Alert.alert(
            '📍 Location Alert',
            `You've entered the area near ${poi.title}!`,
            [{ text: 'OK' }]
          );
        }
      } else {
        const alertKey = `entered_${poi.id}`;
        if (geofenceAlerts.includes(alertKey)) {
          setGeofenceAlerts(geofenceAlerts.filter((key) => key !== alertKey));
          Alert.alert(
            '📍 Location Alert',
            `You've left the area near ${poi.title}.`,
            [{ text: 'OK' }]
          );
        }
      }
    });
  };

  const handleZoomIn = () => {
    if (webViewRef.current && mapLoaded) {
      const script = `zoomIn(); true;`;
      webViewRef.current.injectJavaScript(script);
    }
  };

  const handleZoomOut = () => {
    if (webViewRef.current && mapLoaded) {
      const script = `zoomOut(); true;`;
      webViewRef.current.injectJavaScript(script);
    }
  };

  const handleCenterOnUser = () => {
    if (webViewRef.current && mapLoaded && userLocation) {
      const script = `centerOnUser(${userLocation.latitude}, ${userLocation.longitude}); true;`;
      webViewRef.current.injectJavaScript(script);
    }
  };

  const getMarkerIcon = (type: string) => {
    switch (type) {
      case 'music':
        return '🎵';
      case 'venue':
        return '🎤';
      case 'landmark':
        return '📍';
      default:
        return '📍';
    }
  };

  const getMarkerColor = (type: string) => {
    switch (type) {
      case 'music':
        return '#1DB954';
      case 'venue':
        return '#FF6B9D';
      case 'landmark':
        return '#8B5CF6';
      default:
        return '#1DB954';
    }
  };

  // Generate HTML for Leaflet map (OpenStreetMap - no API key required)
  const generateMapHTML = () => {
    const defaultLat = userLocation?.latitude || 40.7589;
    const defaultLng = userLocation?.longitude || -73.9851;
    
    const markers = pointsOfInterest.map((poi) => ({
      ...poi,
      icon: getMarkerIcon(poi.type),
      color: getMarkerColor(poi.type),
    }));

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              margin: 0;
              padding: 0;
              background: #121212;
              overflow: hidden;
            }
            #map {
              width: 100%;
              height: 100vh;
            }
            .custom-marker {
              background: #1DB954;
              width: 30px;
              height: 30px;
              border-radius: 50%;
              border: 3px solid #FFFFFF;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 16px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            }
            .poi-marker {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              border: 3px solid #FFFFFF;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 20px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            }
          </style>
        </head>
        <body>
          <div id="map"></div>
          <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
          <script>
            let map;
            let userMarker;
            let userCircle;
            let poiMarkers = [];
            let poiCircles = [];
            let currentZoom = 15;
            const userLocation = [${defaultLat}, ${defaultLng}];
            const pois = ${JSON.stringify(markers)};

            function initMap() {
              // Initialize map with dark tile layer
              map = L.map('map', {
                center: userLocation,
                zoom: currentZoom,
                zoomControl: true,
              });

              // Use CartoDB dark theme tiles
              L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
                subdomains: 'abcd',
                maxZoom: 20
              }).addTo(map);

              // User location marker with pulse effect
              const userIcon = L.divIcon({
                className: 'custom-marker',
                html: '<div style="background: #1DB954; width: 30px; height: 30px; border-radius: 50%; border: 3px solid #FFFFFF; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">📍</div>',
                iconSize: [30, 30],
                iconAnchor: [15, 15],
              });

              userMarker = L.marker(userLocation, { icon: userIcon }).addTo(map);
              userMarker.bindPopup('<b>Your Location</b><br>You are here');

              // User location pulse circle
              userCircle = L.circle(userLocation, {
                color: '#1DB954',
                fillColor: '#1DB954',
                fillOpacity: 0.1,
                radius: 50
              }).addTo(map);

              // Points of interest markers
              pois.forEach((poi) => {
                const poiIcon = L.divIcon({
                  className: 'poi-marker',
                  html: '<div style="background: ' + poi.color + '; width: 40px; height: 40px; border-radius: 50%; border: 3px solid #FFFFFF; display: flex; align-items: center; justify-content: center; font-size: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">' + poi.icon + '</div>',
                  iconSize: [40, 40],
                  iconAnchor: [20, 20],
                });

                const marker = L.marker([poi.coordinate.latitude, poi.coordinate.longitude], { icon: poiIcon }).addTo(map);
                marker.bindPopup('<b>' + poi.title + '</b><br>' + poi.description);
                poiMarkers.push(marker);

                // Geofence circle (100m radius)
                const circle = L.circle([poi.coordinate.latitude, poi.coordinate.longitude], {
                  color: poi.color,
                  fillColor: poi.color,
                  fillOpacity: 0.1,
                  radius: 100
                }).addTo(map);
                poiCircles.push(circle);
              });

              window.mapInitialized = true;
              if (window.ReactNativeWebView) {
                window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'mapLoaded' }));
              }
            }

            function updateUserLocation(lat, lng) {
              const newLocation = [lat, lng];
              userMarker.setLatLng(newLocation);
              userCircle.setLatLng(newLocation);
              map.setView(newLocation, currentZoom);
            }

            function zoomIn() {
              currentZoom = Math.min(currentZoom + 1, 20);
              map.setZoom(currentZoom);
            }

            function zoomOut() {
              currentZoom = Math.max(currentZoom - 1, 1);
              map.setZoom(currentZoom);
            }

            function centerOnUser(lat, lng) {
              const location = [lat, lng];
              map.setView(location, 15);
              currentZoom = 15;
            }

            // Initialize map when page loads
            window.addEventListener('load', initMap);
          </script>
        </body>
      </html>
    `;
  };

  const handleMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'mapLoaded') {
        setMapLoaded(true);
      }
    } catch (error) {
      // Ignore parse errors
    }
  };

  if (!userLocation) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1DB954" />
          <Text style={styles.loadingText}>Loading map...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        {onClose ? (
          <TouchableOpacity
            onPress={onClose}
            style={styles.backButton}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}
        <Text style={styles.headerTitle}>Map</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Map WebView */}
      <WebView
        ref={webViewRef}
        source={{ html: generateMapHTML() }}
        style={styles.map}
        onMessage={handleMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#1DB954" />
            <Text style={styles.loadingText}>Loading map...</Text>
          </View>
        )}
      />

      {/* Map Controls */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={handleZoomIn}
          accessibilityRole="button"
          accessibilityLabel="Zoom in"
        >
          <Ionicons name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={handleZoomOut}
          accessibilityRole="button"
          accessibilityLabel="Zoom out"
        >
          <Ionicons name="remove" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={handleCenterOnUser}
          accessibilityRole="button"
          accessibilityLabel="Center on my location"
        >
          <Ionicons name="locate" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Points of Interest Legend */}
      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Points of Interest</Text>
        <View style={styles.legendItems}>
          {pointsOfInterest.map((poi) => (
            <View key={poi.id} style={styles.legendItem}>
              <View
                style={[
                  styles.legendDot,
                  { backgroundColor: getMarkerColor(poi.type) },
                ]}
              />
              <Text style={styles.legendText}>{poi.title}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginTop: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#121212',
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  placeholder: {
    width: 40,
  },
  map: {
    flex: 1,
    backgroundColor: '#121212',
  },
  controlsContainer: {
    position: 'absolute',
    right: 16,
    top: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 8,
    padding: 8,
    gap: 8,
    zIndex: 100,
  },
  controlButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  legend: {
    position: 'absolute',
    bottom: 100,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 12,
    padding: 16,
    zIndex: 100,
  },
  legendTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  legendItems: {
    gap: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});
