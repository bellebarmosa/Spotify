import React from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

interface SpotifyHeaderProps {
  title: string;
  showMenuButton?: boolean;
}

export const SpotifyHeader: React.FC<SpotifyHeaderProps> = ({ title, showMenuButton = false }) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  const handleMenuPress = () => {
    navigation.openDrawer();
  };

  return (
    <View
      style={[styles.header, { paddingTop: insets.top }]}
      accessibilityRole="header"
      accessibilityLabel={`${title} screen header`}
    >
      <View style={styles.headerContent}>
        {showMenuButton && (
          <TouchableOpacity
            onPress={handleMenuPress}
            style={styles.menuButton}
            accessibilityRole="button"
            accessibilityLabel="Open navigation menu"
            accessibilityHint="Opens the side navigation drawer"
          >
            <Ionicons name="menu" size={28} color="#FFFFFF" />
          </TouchableOpacity>
        )}
        <Text style={styles.title} accessibilityRole="text">
          {title}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#121212',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    marginRight: 16,
    padding: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: Platform.select({
      ios: 'system-ui',
      default: 'normal',
    }),
  },
});

