import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '@/hooks/useTheme';

const { width } = Dimensions.get('window');

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
}

// Preset colors for quick selection
const PRESET_COLORS = [
  '#1DB954', // Spotify Green
  '#FF6B9D', // Pink
  '#8B5CF6', // Purple
  '#FFA500', // Orange
  '#00CED1', // Cyan
  '#FF1493', // Deep Pink
  '#00FF00', // Lime
  '#FFD700', // Gold
  '#FF4500', // Red Orange
  '#9370DB', // Medium Purple
  '#00BFFF', // Deep Sky Blue
  '#FF69B4', // Hot Pink
];

export const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  onChange,
  label = 'Accent Color',
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [customColor, setCustomColor] = useState(value);
  const { colors } = useTheme();

  const handleColorSelect = (color: string) => {
    setCustomColor(color);
    onChange(color);
  };

  const handleClose = () => {
    setModalVisible(false);
  };

  const colorButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(1) }],
    };
  });

  return (
    <>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.colorPreview}
        accessibilityRole="button"
        accessibilityLabel={`Select ${label}`}
      >
        <View style={[styles.colorCircle, { backgroundColor: value }]} />
        <Text style={[styles.colorLabel, { color: colors.text }]}>{label}</Text>
        <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={handleClose}
      >
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[
              styles.modalContent,
              { backgroundColor: colors.surface },
            ]}
          >
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                Select {label}
              </Text>
              <TouchableOpacity
                onPress={handleClose}
                style={styles.closeButton}
                accessibilityRole="button"
                accessibilityLabel="Close color picker"
              >
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.colorGridContainer} showsVerticalScrollIndicator={false}>
              <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
                Preset Colors
              </Text>
              <View style={styles.colorGrid}>
                {PRESET_COLORS.map((color) => (
                  <TouchableOpacity
                    key={color}
                    onPress={() => handleColorSelect(color)}
                    style={styles.colorOption}
                    accessibilityRole="button"
                    accessibilityLabel={`Select color ${color}`}
                  >
                    <Animated.View
                      style={[
                        styles.colorOptionCircle,
                        { backgroundColor: color },
                        colorButtonStyle,
                      ]}
                    >
                      {value === color && (
                        <Ionicons name="checkmark" size={20} color="#FFFFFF" />
                      )}
                    </Animated.View>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={[styles.sectionTitle, { color: colors.textSecondary, marginTop: 24 }]}>
                Custom Color
              </Text>
              <View style={styles.customColorContainer}>
                <View style={[styles.customColorPreview, { backgroundColor: customColor }]} />
                <Text style={[styles.customColorText, { color: colors.text }]}>
                  {customColor.toUpperCase()}
                </Text>
              </View>
              <Text style={[styles.customColorHint, { color: colors.textSecondary }]}>
                Tap a preset color above to select
              </Text>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                onPress={handleClose}
                style={[styles.doneButton, { backgroundColor: colors.primary }]}
                accessibilityRole="button"
                accessibilityLabel="Done"
              >
                <Text style={styles.doneButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  colorPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  colorCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  colorLabel: {
    fontSize: 16,
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorGridContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  colorOption: {
    width: (width - 80) / 4,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorOptionCircle: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  customColorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    marginBottom: 8,
  },
  customColorPreview: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  customColorText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'monospace',
  },
  customColorHint: {
    fontSize: 12,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  modalFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  doneButton: {
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

