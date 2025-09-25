import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import CameraScreen from '../screens/Camera'; // Import CameraScreen
// import PlaylistScreen from '../screens/PlaylistScreen';
import HomeScreen from '../screens/HomeScreen'; // New HomeScreen
import LibraryScreen from '../screens/LibraryScreen'; // Renamed from old HomeScreen
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen'; // Re-add SearchScreen
// import { Camera , CameraType} from 'expo-camera'; // Import Camera from expo-camera

//import { Camera } from "expo-camera";

{
  "expo"; {
    "plugins"; [
      [
        "expo-camera",
        {
          "cameraPermission": "Allow $(PRODUCT_NAME) to access your camera",
          "microphonePermission": "Allow $(PRODUCT_NAME) to access your microphone",
          "recordAudioAndroid": true
        }
      ]
    ]
  }
}


export type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  SignUp: undefined;
  MainTabs: undefined; // New route for the bottom tab navigator
  Camera: undefined; // Add Camera screen to RootStackParamList
};

export type BottomTabParamList = {
  Home: undefined;
  Search: undefined; // Add Search screen
  Library: undefined; // Add Library screen
  Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<BottomTabParamList>();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#1DB954',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#121212',
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Library" component={LibraryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Landing">
      <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MainTabs" component={MainTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Camera" component={CameraScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
