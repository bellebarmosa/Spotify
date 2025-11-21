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
import { Image as ExpoImage } from 'expo-image';
import { getUser, logout } from '@/services/auth';
import { useNavigation } from '@react-navigation/native';

export const ProfileDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [username, setUsername] = React.useState('yves');
  const [userEmail, setUserEmail] = React.useState('');

  React.useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const user = await getUser();
    if (user) {
      setUsername(user.username || user.name || 'yves');
      setUserEmail(user.email || '');
    }
  };

  const handleLogout = async () => {
    await logout();
    // @ts-ignore
    navigation.navigate('Login');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.scrollContent}
        accessibilityLabel="Profile drawer"
      >
        {/* User Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profilePictureContainer}>
            <View style={styles.profilePicture}>
              <Text style={styles.profileInitial}>
                {username.charAt(0).toUpperCase()}
              </Text>
            </View>
          </View>
          <Text style={styles.username}>{username}</Text>
          <TouchableOpacity
            onPress={() => {
              props.navigation.closeDrawer();
              props.navigation.navigate('ProfilePage' as never);
            }}
            accessibilityRole="button"
            accessibilityLabel="View profile"
          >
            <Text style={styles.viewProfileText}>View profile</Text>
          </TouchableOpacity>
        </View>

        {/* Main Menu Items */}
        <View style={styles.menuSection}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              props.navigation.closeDrawer();
            }}
            accessibilityRole="button"
            accessibilityLabel="Add account"
          >
            <View style={styles.menuIconContainer}>
              <Ionicons name="add-circle-outline" size={24} color="#FFFFFF" />
            </View>
            <Text style={styles.menuItemText}>Add account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              props.navigation.closeDrawer();
            }}
            accessibilityRole="button"
            accessibilityLabel="Your Premium"
          >
            <View style={styles.menuIconContainer}>
              <Ionicons name="musical-notes" size={24} color="#1DB954" />
            </View>
            <Text style={styles.menuItemText}>Your Premium</Text>
            <View style={styles.familyBadge}>
              <Text style={styles.familyBadgeText}>Family</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              props.navigation.closeDrawer();
            }}
            accessibilityRole="button"
            accessibilityLabel="What's new"
          >
            <View style={styles.menuIconContainer}>
              <Ionicons name="flash-outline" size={24} color="#FFFFFF" />
            </View>
            <Text style={styles.menuItemText}>What's new</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              props.navigation.closeDrawer();
            }}
            accessibilityRole="button"
            accessibilityLabel="Listening stats"
          >
            <View style={styles.menuIconContainer}>
              <Ionicons name="stats-chart-outline" size={24} color="#FFFFFF" />
            </View>
            <Text style={styles.menuItemText}>Listening stats</Text>
            <View style={styles.newBadge}>
              <View style={styles.newDot} />
              <Text style={styles.newBadgeText}>New</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              props.navigation.closeDrawer();
            }}
            accessibilityRole="button"
            accessibilityLabel="Recents"
          >
            <View style={styles.menuIconContainer}>
              <Ionicons name="time-outline" size={24} color="#FFFFFF" />
            </View>
            <Text style={styles.menuItemText}>Recents</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              props.navigation.closeDrawer();
            }}
            accessibilityRole="button"
            accessibilityLabel="Your Updates"
          >
            <View style={styles.menuIconContainer}>
              <Ionicons name="megaphone-outline" size={24} color="#FFFFFF" />
            </View>
            <Text style={styles.menuItemText}>Your Updates</Text>
            <View style={styles.newBadge}>
              <View style={styles.newDot} />
              <Text style={styles.newBadgeText}>New</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              props.navigation.closeDrawer();
            }}
            accessibilityRole="button"
            accessibilityLabel="Settings and privacy"
          >
            <View style={styles.menuIconContainer}>
              <Ionicons name="settings-outline" size={24} color="#FFFFFF" />
            </View>
            <Text style={styles.menuItemText}>Settings and privacy</Text>
          </TouchableOpacity>
        </View>

        {/* Messages Section */}
        <View style={styles.messagesSection}>
          <Text style={styles.sectionTitle}>Messages</Text>
          <Text style={styles.sectionDescription}>
            Share what you love with friends, right on Spotify.
          </Text>
          <TouchableOpacity
            style={styles.newMessageButton}
            onPress={() => {
              props.navigation.closeDrawer();
            }}
            accessibilityRole="button"
            accessibilityLabel="New message"
          >
            <Ionicons name="create-outline" size={20} color="#FFFFFF" />
            <Text style={styles.newMessageText}>New message</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          accessibilityRole="button"
          accessibilityLabel="Logout"
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  profileSection: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
    marginBottom: 20,
  },
  profilePictureContainer: {
    marginBottom: 12,
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFD93D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#121212',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  viewProfileText: {
    fontSize: 14,
    color: '#B3B3B3',
  },
  menuSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 4,
  },
  menuIconContainer: {
    width: 32,
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 12,
    flex: 1,
  },
  familyBadge: {
    backgroundColor: '#1E88E5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  familyBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  newBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  newDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#1E88E5',
    marginRight: 4,
  },
  newBadgeText: {
    color: '#1E88E5',
    fontSize: 12,
    fontWeight: '600',
  },
  messagesSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#B3B3B3',
    marginBottom: 12,
    lineHeight: 20,
  },
  newMessageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  newMessageText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 12,
    fontWeight: '600',
  },
  logoutButton: {
    marginHorizontal: 16,
    marginTop: 20,
    paddingVertical: 12,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#1a1a1a',
    paddingTop: 20,
  },
  logoutText: {
    fontSize: 16,
    color: '#E22134',
    fontWeight: '600',
  },
});

