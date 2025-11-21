import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { ProfileScreen } from '@/screens/ProfileScreen';
import { SettingsScreen } from '@/screens/SettingsScreen';
import { PlaylistsScreen } from '@/screens/PlaylistsScreen';
import { MainDrawerParamList } from '@/types/navigation';
import { CustomDrawerContent } from './CustomDrawerContent';
import { saveNavigationState, getNavigationState } from '@/services/navigationCache';

const Drawer = createDrawerNavigator<MainDrawerParamList>();

export const DrawerNavigator: React.FC = () => {
  const [initialRoute, setInitialRoute] = useState<keyof MainDrawerParamList>('Profile');
  const [isReady, setIsReady] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const restoreNavigation = async () => {
      const lastScreen = await getNavigationState();
      if (lastScreen && ['Profile', 'Settings', 'Playlists'].includes(lastScreen)) {
        setInitialRoute(lastScreen as keyof MainDrawerParamList);
      }
      setIsReady(true);
    };
    restoreNavigation();
  }, []);

  useEffect(() => {
    if (isReady && initialRoute !== 'Profile') {
      // Navigate to the restored screen after a brief delay to ensure drawer is mounted
      setTimeout(() => {
        navigation.navigate(initialRoute as never);
      }, 100);
    }
  }, [isReady, initialRoute, navigation]);

  if (!isReady) {
    return null; // Or a loading indicator
  }

  return (
    <Drawer.Navigator
      initialRouteName={initialRoute}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#121212',
          width: 280,
        },
        drawerActiveTintColor: '#1DB954',
        drawerInactiveTintColor: '#B3B3B3',
        drawerLabelStyle: {
          marginLeft: -20,
          fontSize: 16,
          fontWeight: '600',
        },
        drawerType: 'slide',
        overlayColor: 'rgba(0, 0, 0, 0.5)',
      }}
      screenListeners={{
        state: (e) => {
          // Save navigation state when drawer navigates
          const state = e.data?.state;
          if (state) {
            const route = state.routes[state.index];
            if (route?.name) {
              saveNavigationState(route.name);
            }
          }
        },
      }}
    >
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
          drawerLabel: 'Profile',
          drawerAccessibilityLabel: 'Profile screen',
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
          drawerLabel: 'Settings',
          drawerAccessibilityLabel: 'Settings screen',
        }}
      />
      <Drawer.Screen
        name="Playlists"
        component={PlaylistsScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="musical-notes-outline" size={size} color={color} />
          ),
          drawerLabel: 'Playlists',
          drawerAccessibilityLabel: 'Playlists screen',
        }}
      />
    </Drawer.Navigator>
  );
};

