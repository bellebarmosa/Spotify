import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Image as ExpoImage } from 'expo-image';
import { getUser } from '@/services/auth';

export const ProfilePageScreen: React.FC = () => {
  const [username, setUsername] = useState('yves');
  const [followers, setFollowers] = useState(1);
  const [following, setFollowing] = useState(104);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const user = await getUser();
    if (user?.username) {
      setUsername(user.username);
    }
  };

  const playlists = [
    { id: '1', name: 'sing along', saves: 0 },
    { id: '2', name: 'pre-2019 rap', saves: 0 },
    { id: '3', name: 'yearn', saves: 0 },
  ];

  const artists = [
    {
      id: '1',
      name: 'Playboi Carti',
      followers: '15,141,138',
      image: 'https://via.placeholder.com/100x100/8B5CF6/FFFFFF?text=PC',
    },
    {
      id: '2',
      name: 'beabadoobee',
      followers: '6,600,170',
      image: 'https://via.placeholder.com/100x100/FF6B9D/FFFFFF?text=BB',
    },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Back Button */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Profile Header Section */}
        <View style={styles.profileHeader}>
          <View style={styles.profilePictureContainer}>
            <View style={styles.profilePicture}>
              <Text style={styles.profileInitial}>
                {username.charAt(0).toUpperCase()}
              </Text>
            </View>
          </View>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.stats}>
            {followers} follower{followers !== 1 ? 's' : ''} • {following} following
          </Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.editButton}
              accessibilityRole="button"
              accessibilityLabel="Edit profile"
            >
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              accessibilityRole="button"
              accessibilityLabel="Share profile"
            >
              <Ionicons name="share-outline" size={20} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              accessibilityRole="button"
              accessibilityLabel="More options"
            >
              <Ionicons name="ellipsis-horizontal" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Playlists Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Playlists</Text>
          {playlists.map((playlist) => (
            <TouchableOpacity
              key={playlist.id}
              style={styles.playlistItem}
              accessibilityRole="button"
            >
              <View style={styles.playlistImageContainer}>
                <View style={styles.playlistImageCollage}>
                  <View style={styles.collageRow}>
                    <View style={[styles.collageItem, { backgroundColor: '#FF6B6B' }]} />
                    <View style={[styles.collageItem, { backgroundColor: '#4ECDC4' }]} />
                  </View>
                  <View style={styles.collageRow}>
                    <View style={[styles.collageItem, { backgroundColor: '#FFE66D' }]} />
                    <View style={[styles.collageItem, { backgroundColor: '#95E1D3' }]} />
                  </View>
                </View>
              </View>
              <View style={styles.playlistInfo}>
                <Text style={styles.playlistName}>{playlist.name}</Text>
                <Text style={styles.playlistMeta}>
                  {playlist.saves} saves • {username}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.seeAllButton}
            accessibilityRole="button"
            accessibilityLabel="See all playlists"
          >
            <Text style={styles.seeAllButtonText}>See all playlists</Text>
          </TouchableOpacity>
        </View>

        {/* Recently Played Artists Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recently played artists</Text>
          {artists.map((artist) => (
            <TouchableOpacity
              key={artist.id}
              style={styles.artistItem}
              accessibilityRole="button"
            >
              <ExpoImage
                source={{ uri: artist.image }}
                style={styles.artistImage}
                contentFit="cover"
              />
              <View style={styles.artistInfo}>
                <Text style={styles.artistName}>{artist.name}</Text>
                <Text style={styles.artistFollowers}>
                  {artist.followers} followers
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  profilePictureContainer: {
    marginBottom: 16,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFD93D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#121212',
  },
  username: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  stats: {
    fontSize: 14,
    color: '#B3B3B3',
    marginBottom: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  editButton: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    backgroundColor: 'transparent',
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  playlistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  playlistImageContainer: {
    marginRight: 12,
  },
  playlistImageCollage: {
    width: 60,
    height: 60,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 4,
    overflow: 'hidden',
  },
  collageRow: {
    flexDirection: 'row',
    width: '50%',
    height: '50%',
  },
  collageItem: {
    flex: 1,
  },
  playlistInfo: {
    flex: 1,
  },
  playlistName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  playlistMeta: {
    fontSize: 14,
    color: '#B3B3B3',
  },
  seeAllButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: 'transparent',
    alignItems: 'center',
    marginTop: 8,
  },
  seeAllButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  artistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  artistImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  artistInfo: {
    flex: 1,
  },
  artistName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  artistFollowers: {
    fontSize: 14,
    color: '#B3B3B3',
  },
});

