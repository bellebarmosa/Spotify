import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '@/screens/LoginScreen';
import { SignUpScreen } from '@/screens/SignUpScreen';
import { BottomTabNavigator } from './BottomTabNavigator';
import { RootStackParamList } from '@/types/navigation';

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {

  return (
    <NavigationContainer
      accessibilityLabel="Main navigation container"
      onStateChange={(state) => {
        // Save navigation state when stack navigator changes
        if (state) {
          const route = state.routes[state.index];
          if (route?.name) {
            // Only save if it's a drawer screen
            if (route.name === 'Main' && route.state) {
              const drawerRoute = route.state.routes[route.state.index];
              if (drawerRoute?.name) {
                import('@/services/navigationCache').then(({ saveNavigationState }) => {
                  saveNavigationState(drawerRoute.name);
                });
              }
            }
          }
        }
      }}
    >
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#121212' },
          animationEnabled: true,
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
        />
        <Stack.Screen name="Main" component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

