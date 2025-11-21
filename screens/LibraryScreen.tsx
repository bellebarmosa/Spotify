import { getUser } from '@/services/auth';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Image as ExpoImage } from 'expo-image';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const LibraryScreen: React.FC = () => {
  const [username, setUsername] = useState('yves');
  const [selectedFilter, setSelectedFilter] = useState('Playlists');
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

  const handleProfilePress = () => {
    // @ts-ignore
    if (navigation.openDrawer) {
      // @ts-ignore
      navigation.openDrawer();
    }
  };

  const filters = ['Playlists', 'Podcasts', 'Albums', 'Artists'];

  const recentItems = [
    {
      id: '1',
      type: 'playlist',
      title: 'playlist1',
      creator: username,
      image: 'playlist',
      collage: true,
    },
    {
      id: '2',
      type: 'feature',
      title: 'playlist2',
      description: 'Tap to start',
      image: 'dj',
      beta: true,
    },
    {
      id: '3',
      type: 'playlist',
      title: 'playlist3',
      creator: username,
      image: 'playlist',
      collage: true,
    },
    {
      id: '4',
      type: 'playlist',
      title: 'Liked Songs',
      count: '561 songs',
      image: 'liked',
      heart: true,
    },
    {
      id: '5',
      type: 'artist',
      title: 'playlist5',
      image: 'https://via.placeholder.com/100x100/FFD93D/121212?text=FG',
    },
    {
      id: '6',
      type: 'playlist',
      title: 'playlist6',
      creator: username,
      image: 'playlist',
      collage: true,
    },
    {
      id: '7',
      type: 'artist',
      title: 'Childish Gambino',
      image: 'https://via.placeholder.com/100x100/8B5CF6/FFFFFF?text=CG',
    },
  ];

  const renderItemImage = (item: any) => {
    if (item.type === 'artist') {
      return (
        <ExpoImage
          source={{ uri: item.image }}
          style={styles.artistImage}
          contentFit="cover"
        />
      );
    }

    if (item.heart) {
      return (
        <View style={styles.likedSongsContainer}>
          <Ionicons name="heart" size={32} color="#FFFFFF" />
        </View>
      );
    }

    if (item.beta) {
      return (
        <View style={styles.djContainer}>
          <View style={styles.djIcon}>
            <Ionicons name="pulse" size={32} color="#1DB954" />
          </View>
          <View style={styles.betaBadge}>
            <Text style={styles.betaText}>BETA</Text>
          </View>
          <Text style={styles.djText}>DJ</Text>
        </View>
      );
    }

    if (item.collage) {
      return (
        <View style={styles.collageContainer}>
          <View style={styles.collageRow}>
            <View style={[styles.collageItem, { backgroundColor: '#FF6B6B' }]} />
            <View style={[styles.collageItem, { backgroundColor: '#4ECDC4' }]} />
          </View>
          <View style={styles.collageRow}>
            <View style={[styles.collageItem, { backgroundColor: '#FFE66D' }]} />
            <View style={[styles.collageItem, { backgroundColor: '#95E1D3' }]} />
          </View>
        </View>
      );
    }

    return null;
  };

  const getItemSubtitle = (item: any) => {
    if (item.type === 'artist') {
      return 'Artist';
    }
    if (item.type === 'feature') {
      return item.description;
    }
    if (item.count) {
      return `Playlist • ${item.count}`;
    }
    return `Playlist • ${item.creator}`;
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity
              onPress={handleProfilePress}
              style={styles.profileButton}
              accessibilityRole="button"
              accessibilityLabel="Open profile menu"
            >
              <View style={styles.profilePicture}>
                <Text style={styles.profileInitial}>
                  {username.charAt(0).toUpperCase()}
                </Text>
              </View>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Your Library</Text>
            <View style={styles.headerIcons}>
              <TouchableOpacity
                style={styles.iconButton}
                accessibilityRole="button"
                accessibilityLabel="Search"
              >
                <Ionicons name="search" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                accessibilityRole="button"
                accessibilityLabel="Add"
              >
                <Ionicons name="add" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScroll}
          >
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterButton,
                  selectedFilter === filter && styles.filterButtonActive,
                ]}
                onPress={() => setSelectedFilter(filter)}
                accessibilityRole="button"
                accessibilityLabel={`Filter by ${filter}`}
                accessibilityState={{ selected: selectedFilter === filter }}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    selectedFilter === filter && styles.filterButtonTextActive,
                  ]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Recents Section */}
        <View style={styles.recentsSection}>
          <View style={styles.recentsHeader}>
            <Text style={styles.recentsTitle}>↓↑ Recents</Text>
            <TouchableOpacity
              style={styles.gridButton}
              accessibilityRole="button"
              accessibilityLabel="Toggle view"
            >
              <Ionicons name="grid-outline" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Recent Items List */}
          <View style={styles.itemsList}>
            {recentItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.itemRow}
                accessibilityRole="button"
              >
                <View style={styles.itemImageContainer}>
                  {renderItemImage(item)}
                </View>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={styles.itemSubtitle} numberOfLines={1}>
                    {getItemSubtitle(item)}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
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
    paddingVertical: 16,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileButton: {
    marginRight: 12,
  },
  profilePicture: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFD93D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#121212',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterContainer: {
    paddingVertical: 12,
  },
  filterScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: 'transparent',
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: '#1a1a1a',
    borderColor: '#1a1a1a',
  },
  filterButtonText: {
    color: '#B3B3B3',
    fontSize: 14,
    fontWeight: '600',
  },
  filterButtonTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  recentsSection: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  recentsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  recentsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  gridButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemsList: {
    gap: 12,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImageContainer: {
    width: 60,
    height: 60,
    marginRight: 12,
    borderRadius: 4,
    overflow: 'hidden',
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#B3B3B3',
  },
  collageContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  collageRow: {
    flexDirection: 'row',
    width: '50%',
    height: '50%',
  },
  collageItem: {
    flex: 1,
  },
  likedSongsContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#503750',
    justifyContent: 'center',
    alignItems: 'center',
  },
  djContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1E3264',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  djIcon: {
    marginBottom: 4,
  },
  betaBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#1DB954',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  betaText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  djText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
    position: 'absolute',
    bottom: 4,
    left: 4,
  },
  artistImage: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
});
