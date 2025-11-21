import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Playlist } from '@/types';
import { SpotifyHeader } from '@/components/SpotifyHeader';

// Mock playlists data
const mockPlaylists: Playlist[] = [
  {
    id: '1',
    title: 'Discover Weekly',
    coverImage: 'https://via.placeholder.com/200x200/1DB954/FFFFFF?text=DW',
    songCount: 30,
  },
  {
    id: '2',
    title: 'Release Radar',
    coverImage: 'https://via.placeholder.com/200x200/1DB954/FFFFFF?text=RR',
    songCount: 25,
  },
  {
    id: '3',
    title: 'Daily Mix 1',
    coverImage: 'https://via.placeholder.com/200x200/1DB954/FFFFFF?text=DM1',
    songCount: 50,
  },
  {
    id: '4',
    title: 'Chill Vibes',
    coverImage: 'https://via.placeholder.com/200x200/1DB954/FFFFFF?text=CV',
    songCount: 40,
  },
  {
    id: '5',
    title: 'Workout Mix',
    coverImage: 'https://via.placeholder.com/200x200/1DB954/FFFFFF?text=WM',
    songCount: 35,
  },
];

export const PlaylistsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();

  const handlePlaylistPress = (playlist: Playlist) => {
    // Handle playlist press - could navigate to playlist detail
    console.log('Playlist pressed:', playlist.title);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: insets.bottom }}
      accessibilityLabel="Playlists screen"
    >
      <SpotifyHeader title="Playlists" showMenuButton={true} />
      <View style={styles.content}>
        {mockPlaylists.map((playlist) => (
          <TouchableOpacity
            key={playlist.id}
            style={styles.playlistItem}
            onPress={() => handlePlaylistPress(playlist)}
            accessibilityRole="button"
            accessibilityLabel={`${playlist.title} playlist`}
            accessibilityHint={`Opens ${playlist.title} playlist`}
          >
            <View
              style={styles.coverImageContainer}
              accessibilityRole="image"
              accessibilityLabel={`${playlist.title} cover image`}
            >
              <Image
                source={{ uri: playlist.coverImage }}
                style={styles.coverImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.playlistInfo}>
              <Text style={styles.playlistTitle} accessibilityRole="text">
                {playlist.title}
              </Text>
              {playlist.songCount && (
                <Text style={styles.playlistCount} accessibilityRole="text">
                  {playlist.songCount} songs
                </Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    padding: 20,
    gap: 16,
  },
  playlistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 12,
  },
  coverImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 16,
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  playlistInfo: {
    flex: 1,
  },
  playlistTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 4,
  },
  playlistCount: {
    fontSize: 14,
    color: '#B3B3B3',
  },
});

