import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setTheme, ThemeMode } from '@/store/themeSlice';
import { themeColors } from '@/constants/themeColors';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const ThemeToggle: React.FC = () => {
  const dispatch = useAppDispatch();
  const { mode, isDark } = useAppSelector((state) => state.theme);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const colors = themeColors[isDark ? 'dark' : 'light'];

  const handleToggle = () => {
    dispatch(setTheme(mode === 'dark' ? 'light' : 'dark'));
  };

  const handleSelectTheme = (themeMode: ThemeMode) => {
    dispatch(setTheme(themeMode));
    setIsModalVisible(false);
  };

  const toggleButtonStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      isDark ? 0 : 1,
      [0, 1],
      ['#1DB954', '#1DB954']
    );
    return {
      backgroundColor: withTiming(backgroundColor, { duration: 300 }),
    };
  });

  const iconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withSpring(isDark ? '0deg' : '180deg', {
            damping: 15,
            stiffness: 200,
          }),
        },
      ],
    };
  });

  const themeOptions: { mode: ThemeMode; label: string; icon: string }[] = [
    { mode: 'light', label: 'Light', icon: 'sunny' },
    { mode: 'dark', label: 'Dark', icon: 'moon' },
    { mode: 'auto', label: 'Auto', icon: 'phone-portrait' },
  ];

  return (
    <>
      <AnimatedTouchable
        style={[styles.toggleButton, toggleButtonStyle]}
        onPress={() => setIsModalVisible(true)}
        accessibilityRole="button"
        accessibilityLabel="Toggle theme"
      >
        <Animated.View style={iconStyle}>
          <Ionicons
            name={isDark ? 'moon' : 'sunny'}
            size={24}
            color="#FFFFFF"
          />
        </Animated.View>
      </AnimatedTouchable>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsModalVisible(false)}
        >
          <View
            style={[styles.modalContent, { backgroundColor: colors.surface }]}
            onStartShouldSetResponder={() => true}
          >
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                Choose Theme
              </Text>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.optionsList}>
              {themeOptions.map((option) => {
                const isSelected = mode === option.mode;
                return (
                  <TouchableOpacity
                    key={option.mode}
                    style={[
                      styles.optionItem,
                      {
                        backgroundColor: isSelected
                          ? colors.primary
                          : colors.card,
                        borderColor: colors.border,
                      },
                    ]}
                    onPress={() => handleSelectTheme(option.mode)}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isSelected }}
                  >
                    <View style={styles.optionContent}>
                      <Ionicons
                        name={option.icon as any}
                        size={24}
                        color={isSelected ? '#FFFFFF' : colors.text}
                      />
                      <Text
                        style={[
                          styles.optionLabel,
                          {
                            color: isSelected ? '#FFFFFF' : colors.text,
                          },
                        ]}
                      >
                        {option.label}
                      </Text>
                    </View>
                    {isSelected && (
                      <Ionicons
                        name="checkmark-circle"
                        size={24}
                        color="#FFFFFF"
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <View style={styles.quickToggle}>
              <Text style={[styles.quickToggleLabel, { color: colors.textSecondary }]}>
                Quick Toggle
              </Text>
              <AnimatedTouchable
                style={[styles.quickToggleButton, toggleButtonStyle]}
                onPress={handleToggle}
              >
                <Animated.View style={iconStyle}>
                  <Ionicons
                    name={isDark ? 'moon' : 'sunny'}
                    size={20}
                    color="#FFFFFF"
                  />
                </Animated.View>
                <Text style={styles.quickToggleText}>
                  {isDark ? 'Dark' : 'Light'}
                </Text>
              </AnimatedTouchable>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  toggleButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 16,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsList: {
    marginBottom: 20,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  quickToggle: {
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#333',
    alignItems: 'center',
  },
  quickToggleLabel: {
    fontSize: 14,
    marginBottom: 12,
  },
  quickToggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    gap: 8,
  },
  quickToggleText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

