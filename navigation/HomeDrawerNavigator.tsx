import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeScreen } from '@/screens/HomeScreen';
import { ProfilePageScreen } from '@/screens/ProfilePageScreen';
import { ProfileDrawerContent } from '@/components/ProfileDrawerContent';

const Drawer = createDrawerNavigator();

export const HomeDrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <ProfileDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#121212',
          width: 320,
        },
        drawerType: 'slide',
        overlayColor: 'rgba(0, 0, 0, 0.5)',
        swipeEnabled: true,
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="ProfilePage" component={ProfilePageScreen} />
    </Drawer.Navigator>
  );
};

