import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { DrawerContentScrollView, DrawerContentComponentProps } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

export const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const insets = useSafeAreaInsets();
  const { state, navigation } = props;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(1, { duration: 300 }),
      transform: [
        {
          translateX: withSpring(0, {
            damping: 20,
            stiffness: 90,
          }),
        },
      ],
    };
  });

  const getIconName = (routeName: string): keyof typeof Ionicons.glyphMap => {
    switch (routeName) {
      case 'Profile':
        return 'person-outline';
      case 'Settings':
        return 'settings-outline';
      case 'Playlists':
        return 'musical-notes-outline';
      default:
        return 'home-outline';
    }
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top },
        ]}
        accessibilityLabel="Navigation drawer"
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle} accessibilityRole="text">
            Spotify
          </Text>
        </View>

        <View style={styles.menuItems}>
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;
            const iconName = getIconName(route.name);

            return (
              <TouchableOpacity
                key={route.key}
                style={[
                  styles.menuItem,
                  isFocused && styles.menuItemActive,
                ]}
                onPress={() => {
                  navigation.navigate(route.name as never);
                }}
                accessibilityRole="button"
                accessibilityLabel={`Navigate to ${route.name} screen`}
                accessibilityState={{ selected: isFocused }}
              >
                <Ionicons
                  name={iconName}
                  size={24}
                  color={isFocused ? '#1DB954' : '#B3B3B3'}
                />
                <Text
                  style={[
                    styles.menuItemText,
                    isFocused && styles.menuItemTextActive,
                  ]}
                  accessibilityRole="text"
                >
                  {route.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </DrawerContentScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  menuItems: {
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 8,
  },
  menuItemActive: {
    backgroundColor: '#1a1a1a',
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#B3B3B3',
    marginLeft: 16,
  },
  menuItemTextActive: {
    color: '#1DB954',
  },
});

