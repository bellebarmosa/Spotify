import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Image as ExpoImage } from 'expo-image';
import { getUser } from '@/services/auth';

const { width } = Dimensions.get('window');
const BROWSE_TILE_WIDTH = (width - 48) / 2; // 2 tiles per row with padding

export const SearchScreen: React.FC = () => {
  const [username, setUsername] = useState('yves');
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  React.useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const user = await getUser();
    if (user?.username) {
      setUsername(user.username);
    }
  };

  const handleProfilePress = () => {
    // @ts-ignore
    if (navigation.openDrawer) {
      // @ts-ignore
      navigation.openDrawer();
    }
  };

  const browseCategories = [
    {
      id: '1',
      title: 'Music',
      color: '#FF6B9D',
      image: 'https://via.placeholder.com/80x80/FF6B9D/FFFFFF?text=M',
    },
    {
      id: '2',
      title: 'Podcasts',
      color: '#1E7B4A',
      image: 'https://via.placeholder.com/80x80/1E7B4A/FFFFFF?text=P',
    },
    {
      id: '3',
      title: 'Live Events',
      color: '#8B5CF6',
      image: 'https://via.placeholder.com/80x80/8B5CF6/FFFFFF?text=LE',
    },
    {
      id: '4',
      title: 'K-Pop ON! (온) Hub',
      color: '#1E88E5',
      image: 'https://via.placeholder.com/80x80/1E88E5/FFFFFF?text=K',
    },
  ];

  const discoverItems = [
    {
      id: '1',
      title: 'Music for you',
      image: 'https://via.placeholder.com/200x200/E0E0E0/666666?text=Music',
    },
    {
      id: '2',
      title: '#pinoy drill',
      image: 'https://via.placeholder.com/200x200/8B0000/FFFFFF?text=#PD',
    },
    {
      id: '3',
      title: '#downtown vibes',
      image: 'https://via.placeholder.com/200x200/4A90E2/FFFFFF?text=#DV',
    },
  ];

  const browseAllItems = [
    {
      id: '1',
      title: 'Made For You',
      color: '#8B5CF6',
      image: 'https://via.placeholder.com/100x100/8B5CF6/FFFFFF?text=MFY',
    },
    {
      id: '2',
      title: 'Upcoming Releases',
      color: '#1E7B4A',
      image: 'https://via.placeholder.com/100x100/1E7B4A/FFFFFF?text=UR',
    },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity
              onPress={handleProfilePress}
              style={styles.profileButton}
              accessibilityRole="button"
              accessibilityLabel="Open profile menu"
            >
              <View style={styles.profilePicture}>
                <Text style={styles.profileInitial}>
                  {username.charAt(0).toUpperCase()}
                </Text>
              </View>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Search</Text>
            <TouchableOpacity
              style={styles.cameraButton}
              accessibilityRole="button"
              accessibilityLabel="Camera"
            >
              <Ionicons name="camera-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View style={styles.searchBarContainer}>
            <Ionicons name="search" size={20} color="#B3B3B3" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="What do you want to listen to?"
              placeholderTextColor="#B3B3B3"
              value={searchQuery}
              onChangeText={setSearchQuery}
              accessibilityLabel="Search input"
            />
          </View>
        </View>

        {/* Start browsing Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Start browsing</Text>
          <View style={styles.browseGrid}>
            {browseCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[styles.browseTile, { backgroundColor: category.color }]}
                accessibilityRole="button"
              >
                <Text style={styles.browseTileText}>{category.title}</Text>
                <View style={styles.browseTileImage}>
                  <ExpoImage
                    source={{ uri: category.image }}
                    style={styles.tiltedImage}
                    contentFit="cover"
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Discover something new Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Discover something new</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {discoverItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.discoverTile}
                accessibilityRole="button"
              >
                <ExpoImage
                  source={{ uri: item.image }}
                  style={styles.discoverTileImage}
                  contentFit="cover"
                />
                <View style={styles.discoverTileOverlay}>
                  <Text style={styles.discoverTileText}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Browse all Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Browse all</Text>
          <View style={styles.browseAllContainer}>
            {browseAllItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.browseAllTile, { backgroundColor: item.color }]}
                accessibilityRole="button"
              >
                <Text style={styles.browseAllTileText}>{item.title}</Text>
                <View style={styles.browseAllTileImage}>
                  <ExpoImage
                    source={{ uri: item.image }}
                    style={styles.tiltedImage}
                    contentFit="cover"
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  profileButton: {
    marginRight: 12,
  },
  profilePicture: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFD93D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#121212',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
  },
  cameraButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: '#333',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  browseGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  browseTile: {
    width: BROWSE_TILE_WIDTH,
    height: 100,
    borderRadius: 8,
    padding: 16,
    justifyContent: 'space-between',
    overflow: 'hidden',
    position: 'relative',
  },
  browseTileText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    zIndex: 1,
  },
  browseTileImage: {
    position: 'absolute',
    right: -20,
    bottom: -20,
    width: 80,
    height: 80,
    transform: [{ rotate: '25deg' }],
    opacity: 0.8,
  },
  tiltedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
  discoverTile: {
    width: 160,
    height: 200,
    borderRadius: 8,
    marginRight: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  discoverTileImage: {
    width: '100%',
    height: '100%',
  },
  discoverTileOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  discoverTileText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  browseAllContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  browseAllTile: {
    flex: 1,
    height: 120,
    borderRadius: 8,
    padding: 16,
    justifyContent: 'space-between',
    overflow: 'hidden',
    position: 'relative',
  },
  browseAllTileText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    zIndex: 1,
  },
  browseAllTileImage: {
    position: 'absolute',
    right: -15,
    bottom: -15,
    width: 100,
    height: 100,
    transform: [{ rotate: '25deg' }],
    opacity: 0.8,
  },
});
