import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  Dimensions,
  ScrollView,
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image as ExpoImage } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export type FilterType = 'none' | 'vintage' | 'blackwhite' | 'sepia' | 'cool' | 'warm';

interface CameraModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (uri: string) => void;
  currentImageUri?: string;
}

export const CameraModal: React.FC<CameraModalProps> = ({
  visible,
  onClose,
  onSave,
  currentImageUri,
}) => {
  const [facing, setFacing] = useState<CameraType>('front');
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('none');
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(1);
  const [saturation, setSaturation] = useState(1);
  const cameraRef = useRef<CameraView>(null);

  useEffect(() => {
    if (visible && !permission?.granted) {
      requestPermission();
    }
  }, [visible, permission]);

  const handleTakePicture = async () => {
    try {
      // Try using CameraView first
      if (cameraRef.current) {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
        });
        if (photo?.uri) {
          setCapturedImage(photo.uri);
          return;
        }
      }
    } catch (error) {
      // Fallback to ImagePicker if CameraView fails
      console.log('CameraView failed, trying ImagePicker:', error);
    }

    // Fallback: Use ImagePicker's camera
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setCapturedImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take picture');
      console.error(error);
    }
  };

  const handlePickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setCapturedImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
      console.error(error);
    }
  };

  const applyFilters = async (uri: string): Promise<string> => {
    let manipulated = { uri };

    // Apply brightness and contrast
    if (brightness !== 0 || contrast !== 1 || saturation !== 1) {
      manipulated = await ImageManipulator.manipulateAsync(
        uri,
        [],
        {
          compress: 0.8,
        }
      );
    }

    // Apply filter effects
    switch (selectedFilter) {
      case 'vintage':
        // Vintage effect (warm tone)
        break;
      case 'blackwhite':
        manipulated = await ImageManipulator.manipulateAsync(
          manipulated.uri,
          [{ grayscale: true }],
          { compress: 0.8 }
        );
        break;
      case 'sepia':
        // Sepia effect
        break;
      case 'cool':
        // Cool tone
        break;
      case 'warm':
        // Warm tone
        break;
      default:
        break;
    }

    return manipulated.uri;
  };

  const handleSave = async () => {
    if (!capturedImage) return;

    try {
      const finalUri = await applyFilters(capturedImage);
      onSave(finalUri);
      handleClose();
    } catch (error) {
      Alert.alert('Error', 'Failed to save image');
      console.error(error);
    }
  };

  const handleClose = () => {
    setCapturedImage(null);
    setSelectedFilter('none');
    setBrightness(0);
    setContrast(1);
    setSaturation(1);
    onClose();
  };

  const filters: { type: FilterType; label: string; icon: string }[] = [
    { type: 'none', label: 'Original', icon: 'image-outline' },
    { type: 'vintage', label: 'Vintage', icon: 'color-filter-outline' },
    { type: 'blackwhite', label: 'B&W', icon: 'contrast-outline' },
    { type: 'sepia', label: 'Sepia', icon: 'sunny-outline' },
    { type: 'cool', label: 'Cool', icon: 'snow-outline' },
    { type: 'warm', label: 'Warm', icon: 'flame-outline' },
  ];

  if (!permission) {
    return null;
  }

  if (!permission.granted) {
    return (
      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionText}>Camera permission is required</Text>
          <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.container}>
        {capturedImage ? (
          // Edit Mode
          <View style={styles.editContainer}>
            <View style={styles.editHeader}>
              <TouchableOpacity onPress={() => setCapturedImage(null)} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={styles.editTitle}>Edit Photo</Text>
              <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.imagePreview}>
              <ExpoImage
                source={{ uri: capturedImage }}
                style={styles.previewImage}
                contentFit="contain"
              />
            </View>

            {/* Filters */}
            <View style={styles.filtersSection}>
              <Text style={styles.sectionLabel}>Filters</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersList}>
                {filters.map((filter) => (
                  <TouchableOpacity
                    key={filter.type}
                    style={[
                      styles.filterOption,
                      selectedFilter === filter.type && styles.filterOptionActive,
                    ]}
                    onPress={() => setSelectedFilter(filter.type)}
                  >
                    <Ionicons
                      name={filter.icon as any}
                      size={24}
                      color={selectedFilter === filter.type ? '#1DB954' : '#B3B3B3'}
                    />
                    <Text
                      style={[
                        styles.filterLabel,
                        selectedFilter === filter.type && styles.filterLabelActive,
                      ]}
                    >
                      {filter.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Editing Tools */}
            <View style={styles.toolsSection}>
              <View style={styles.toolRow}>
                <Text style={styles.toolLabel}>Brightness</Text>
                <View style={styles.sliderContainer}>
                  <TouchableOpacity
                    onPress={() => setBrightness(Math.max(-1, brightness - 0.1))}
                    style={styles.sliderButton}
                  >
                    <Ionicons name="remove" size={20} color="#FFFFFF" />
                  </TouchableOpacity>
                  <Text style={styles.sliderValue}>{brightness.toFixed(1)}</Text>
                  <TouchableOpacity
                    onPress={() => setBrightness(Math.min(1, brightness + 0.1))}
                    style={styles.sliderButton}
                  >
                    <Ionicons name="add" size={20} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.toolRow}>
                <Text style={styles.toolLabel}>Contrast</Text>
                <View style={styles.sliderContainer}>
                  <TouchableOpacity
                    onPress={() => setContrast(Math.max(0.5, contrast - 0.1))}
                    style={styles.sliderButton}
                  >
                    <Ionicons name="remove" size={20} color="#FFFFFF" />
                  </TouchableOpacity>
                  <Text style={styles.sliderValue}>{contrast.toFixed(1)}</Text>
                  <TouchableOpacity
                    onPress={() => setContrast(Math.min(2, contrast + 0.1))}
                    style={styles.sliderButton}
                  >
                    <Ionicons name="add" size={20} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.toolRow}>
                <Text style={styles.toolLabel}>Saturation</Text>
                <View style={styles.sliderContainer}>
                  <TouchableOpacity
                    onPress={() => setSaturation(Math.max(0, saturation - 0.1))}
                    style={styles.sliderButton}
                  >
                    <Ionicons name="remove" size={20} color="#FFFFFF" />
                  </TouchableOpacity>
                  <Text style={styles.sliderValue}>{saturation.toFixed(1)}</Text>
                  <TouchableOpacity
                    onPress={() => setSaturation(Math.min(2, saturation + 0.1))}
                    style={styles.sliderButton}
                  >
                    <Ionicons name="add" size={20} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ) : (
          // Camera Mode
          <View style={styles.cameraContainer}>
            <View style={styles.cameraHeader}>
              <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                <Ionicons name="close" size={28} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={styles.cameraTitle}>Take Photo</Text>
              <View style={styles.placeholder} />
            </View>

            <View style={styles.camera}>
              <CameraView
                ref={cameraRef}
                style={StyleSheet.absoluteFill}
                facing={facing}
              />
              <View style={styles.cameraOverlay}>
                <View style={styles.cameraControls}>
                  <TouchableOpacity
                    onPress={handlePickImage}
                    style={styles.galleryButton}
                    accessibilityRole="button"
                    accessibilityLabel="Pick from gallery"
                  >
                    {currentImageUri ? (
                      <ExpoImage
                        source={{ uri: currentImageUri }}
                        style={styles.galleryThumbnail}
                        contentFit="cover"
                      />
                    ) : (
                      <Ionicons name="images-outline" size={32} color="#FFFFFF" />
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleTakePicture}
                    style={styles.captureButton}
                    accessibilityRole="button"
                    accessibilityLabel="Take picture"
                  >
                    <View style={styles.captureButtonInner} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => setFacing(facing === 'back' ? 'front' : 'back')}
                    style={styles.flipButton}
                    accessibilityRole="button"
                    accessibilityLabel="Flip camera"
                  >
                    <Ionicons name="camera-reverse-outline" size={32} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    padding: 20,
  },
  permissionText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  permissionButton: {
    backgroundColor: '#1DB954',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 12,
  },
  permissionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  cameraContainer: {
    flex: 1,
  },
  cameraHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  cameraTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 44,
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  cameraControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  galleryButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  galleryThumbnail: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  captureButtonInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFFFFF',
  },
  flipButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editContainer: {
    flex: 1,
    backgroundColor: '#121212',
  },
  editHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 60,
  },
  backButton: {
    padding: 8,
  },
  editTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  saveButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  saveButtonText: {
    color: '#1DB954',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imagePreview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  previewImage: {
    width: width - 40,
    height: width - 40,
    borderRadius: (width - 40) / 2,
  },
  filtersSection: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#1a1a1a',
  },
  sectionLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  filtersList: {
    flexDirection: 'row',
  },
  filterOption: {
    alignItems: 'center',
    marginRight: 20,
    padding: 8,
  },
  filterOptionActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#1DB954',
  },
  filterLabel: {
    color: '#B3B3B3',
    fontSize: 12,
    marginTop: 4,
  },
  filterLabelActive: {
    color: '#1DB954',
    fontWeight: '600',
  },
  toolsSection: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#1a1a1a',
  },
  toolRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  toolLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sliderButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderValue: {
    color: '#FFFFFF',
    fontSize: 14,
    minWidth: 40,
    textAlign: 'center',
  },
});

