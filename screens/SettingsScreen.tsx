import { ColorPicker } from '@/components/ColorPicker';
import { SpotifyHeader } from '@/components/SpotifyHeader';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useTheme } from '@/hooks/useTheme';
import { logout } from '@/services/auth';
import { useAppDispatch } from '@/store/hooks';
import { setCustomColors } from '@/store/themeSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const NOTIFICATIONS_KEY = '@spotify:notifications_enabled';

export const SettingsScreen: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { colors, mode, customColors } = useTheme();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const notifications = await AsyncStorage.getItem(NOTIFICATIONS_KEY);
      if (notifications !== null) {
        setNotificationsEnabled(notifications === 'true');
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const handleNotificationsToggle = async (value: boolean) => {
    setNotificationsEnabled(value);
    try {
      await AsyncStorage.setItem(NOTIFICATIONS_KEY, value.toString());
    } catch (error) {
      console.error('Error saving notifications setting:', error);
    }
  };


  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
            // @ts-ignore - navigation type issue
            navigation.navigate('Login');
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: insets.bottom }}
      accessibilityLabel="Settings screen"
    >
      <SpotifyHeader title="Settings" showMenuButton={true} />
      <View style={[styles.content, { backgroundColor: colors.background }]}>
        <View style={styles.section}>
          <View style={[styles.settingRow, { borderBottomColor: colors.border }]}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: colors.text }]} accessibilityRole="text">
                Notifications
              </Text>
              <Text style={[styles.settingDescription, { color: colors.textSecondary }]} accessibilityRole="text">
                Enable push notifications
              </Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={handleNotificationsToggle}
              trackColor={{ false: '#767577', true: '#1DB954' }}
              thumbColor={notificationsEnabled ? '#FFFFFF' : '#f4f3f4'}
              accessibilityRole="switch"
              accessibilityLabel="Toggle notifications"
              accessibilityState={{ checked: notificationsEnabled }}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: colors.text }]} accessibilityRole="text">
                Theme
              </Text>
              <Text style={[styles.settingDescription, { color: colors.textSecondary }]} accessibilityRole="text">
                Choose your theme preference
              </Text>
            </View>
            <ThemeToggle />
          </View>

          {/* Custom Theme Color Options */}
          {mode === 'custom' && customColors && (
            <>
              <View style={[styles.divider, { backgroundColor: colors.border }]} />
              <View style={styles.customThemeSection}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  Custom Theme Colors
                </Text>
                <Text style={[styles.sectionDescription, { color: colors.textSecondary }]}>
                  Customize accent colors for your theme
                </Text>

                <View style={styles.colorPickerContainer}>
                  <ColorPicker
                    value={customColors.primary}
                    onChange={(color) => {
                      dispatch(
                        setCustomColors({
                          ...customColors,
                          primary: color,
                          accent: color, // Update accent to match primary
                        })
                      );
                    }}
                    label="Primary Color"
                  />
                </View>

                <View style={styles.colorPickerContainer}>
                  <ColorPicker
                    value={customColors.secondary}
                    onChange={(color) => {
                      dispatch(
                        setCustomColors({
                          ...customColors,
                          secondary: color,
                        })
                      );
                    }}
                    label="Secondary Color"
                  />
                </View>

                <View style={styles.colorPickerContainer}>
                  <ColorPicker
                    value={customColors.accent}
                    onChange={(color) => {
                      dispatch(
                        setCustomColors({
                          ...customColors,
                          accent: color,
                        })
                      );
                    }}
                    label="Accent Color"
                  />
                </View>
              </View>
            </>
          )}
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          accessibilityRole="button"
          accessibilityLabel="Logout button"
          accessibilityHint="Logs out and returns to sign up screen"
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
  },
  logoutButton: {
    backgroundColor: '#E22134',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    marginVertical: 16,
  },
  customThemeSection: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    marginBottom: 16,
  },
  colorPickerContainer: {
    marginBottom: 12,
  },
});

