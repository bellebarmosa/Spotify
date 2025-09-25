import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, Text, TouchableOpacity, Image } from "react-native";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function LandingScreen({ navigation }: any) {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold">Landing</Text>
      <TouchableOpacity
        className="mt-4 bg-black px-4 py-2 rounded"
        onPress={() => navigation.navigate("Login")}
      >
        <Text className="text-white">Login</Text>
      </TouchableOpacity>
    </View>
  );
}

function LoginScreen({ navigation }: any) {
  return (
    <View className="flex-1 items-center justify-center">
      <Text>Login</Text>
      <TouchableOpacity onPress={() => navigation.replace("MainApp")}>
        <Text className="text-blue-500">Go to App</Text>
      </TouchableOpacity>
    </View>
  );
}

function SignupScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text>Signup</Text>
    </View>
  );
}

// Tab Screens
function HomeScreen() {
  return <View className="flex-1 items-center justify-center"><Text>Home</Text></View>;
}
function SearchScreen() {
  return <View className="flex-1 items-center justify-center"><Text>Search</Text></View>;
}
function LibraryScreen() {
  return <View className="flex-1 items-center justify-center"><Text>Library</Text></View>;
}
function CreateScreen() {
  return <View className="flex-1 items-center justify-center"><Text>Create</Text></View>;
}

// Drawer Screens
function ProfileScreen() {
  return <View className="flex-1 items-center justify-center"><Text>Profile</Text></View>;
}
function SettingsScreen() {
  return <View className="flex-1 items-center justify-center"><Text>Settings</Text></View>;
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Tabs" component={TabsNavigator} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}

function TabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerRight: () => (
          <TouchableOpacity
            className="mr-4"
            onPress={() => navigation.openDrawer()}
          >
            <Image
              source={{ uri: "https://via.placeholder.com/40" }}
              className="w-8 h-8 rounded-full"
            />
          </TouchableOpacity>
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Library" component={LibraryScreen} />
      <Tab.Screen name="Create" component={CreateScreen} />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="MainApp" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
