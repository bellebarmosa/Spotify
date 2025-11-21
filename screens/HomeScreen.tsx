import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image as ExpoImage } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { getUser } from '@/services/auth';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // 2 cards per row with padding

export const HomeScreen: React.FC = () => {
  const [username, setUsername] = React.useState('yves');
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  React.useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const user = await getUser();
    if (user?.username) {
      setUsername(user.username);
    }
  };

  const handleProfilePress = () => {
    navigation.openDrawer();
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
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
          <View style={styles.filterButtonsRow}>
            <TouchableOpacity
              style={[styles.filterButton, styles.filterButtonActive]}
              accessibilityRole="button"
              accessibilityLabel="All filter"
            >
              <Text style={styles.filterButtonTextActive}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterButton, styles.filterButtonSecondary]}
              accessibilityRole="button"
              accessibilityLabel="Music filter"
            >
              <Text style={styles.filterButtonTextSecondary}>Music</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.filterButton}
              accessibilityRole="button"
              accessibilityLabel="Podcasts filter"
            >
              <Text style={styles.filterButtonText}>Podcasts</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Grid Layout */}
        <View style={styles.gridContainer}>
          {/* Row 1 */}
          <TouchableOpacity style={styles.gridCard} accessibilityRole="button">
            <View style={[styles.cardContent, { backgroundColor: '#1E3264' }]}>
              <View style={styles.djCard}>
                <View style={styles.djIcon}>
                  <Text style={styles.djText}>DJ</Text>
                  <Text style={styles.betaText}>BETA</Text>
                </View>
                <Ionicons name="pulse" size={24} color="#1DB954" />
              </View>
            </View>
            <Text style={styles.cardTitle} numberOfLines={1}>
              DJ
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridCard} accessibilityRole="button">
            <View style={[styles.cardContent, { backgroundColor: '#503750' }]}>
              <Ionicons name="heart" size={40} color="#FFFFFF" />
            </View>
            <Text style={styles.cardTitle} numberOfLines={1}>
              Liked Songs
            </Text>
          </TouchableOpacity>

          {/* Row 2 */}
          <TouchableOpacity style={styles.gridCard} accessibilityRole="button">
            <View style={[styles.cardContent, styles.albumCollage]}>
              <View style={styles.collageRow}>
                <View style={[styles.collageItem, { backgroundColor: '#FF6B6B' }]} />
                <View style={[styles.collageItem, { backgroundColor: '#4ECDC4' }]} />
              </View>
              <View style={styles.collageRow}>
                <View style={[styles.collageItem, { backgroundColor: '#FFE66D' }]} />
                <View style={[styles.collageItem, { backgroundColor: '#95E1D3' }]} />
              </View>
            </View>
            <Text style={styles.cardTitle} numberOfLines={1}>
              house
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridCard} accessibilityRole="button">
            <View style={[styles.cardContent, styles.albumCollage]}>
              <View style={styles.collageRow}>
                <View style={[styles.collageItem, { backgroundColor: '#FFD93D' }]} />
                <View style={[styles.collageItem, { backgroundColor: '#6BCB77' }]} />
              </View>
              <View style={styles.collageRow}>
                <View style={[styles.collageItem, { backgroundColor: '#4D96FF' }]} />
                <View style={[styles.collageItem, { backgroundColor: '#9B59B6' }]} />
              </View>
            </View>
            <Text style={styles.cardTitle} numberOfLines={1}>
              progressive thoughts
            </Text>
          </TouchableOpacity>

          {/* Row 3 */}
          <TouchableOpacity style={styles.gridCard} accessibilityRole="button">
            <View style={[styles.cardContent, { backgroundColor: '#8B5CF6' }]}>
              <Text style={styles.edmText}>EDM</Text>
            </View>
            <Text style={styles.cardTitle} numberOfLines={1}>
              EDM House Mix
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridCard} accessibilityRole="button">
            <View style={[styles.cardContent, { backgroundColor: '#1E3264' }]}>
              <View style={styles.thisIsCard}>
                <Text style={styles.thisIsText}>THIS IS</Text>
                <View style={styles.artistPlaceholder} />
              </View>
            </View>
            <Text style={styles.cardTitle} numberOfLines={1}>
              This Is Chris Brown
            </Text>
          </TouchableOpacity>
        </View>

        {/* It's New Music Friday! Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>It's New Music Friday!</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            <TouchableOpacity style={styles.largeCard} accessibilityRole="button">
              <ExpoImage
                source={{
                  uri: 'https://via.placeholder.com/300x300/1DB954/FFFFFF?text=NEW+MUSIC+FRIDAY',
                }}
                style={styles.largeCardImage}
                contentFit="cover"
              />
              <View style={styles.largeCardOverlay}>
                <Text style={styles.largeCardTitle}>NEW MUSIC FRIDAY PHILIPPINES</Text>
              </View>
              <Text style={styles.largeCardDescription} numberOfLines={2}>
                Ariana Grande, Tate McRae, Stray Kids, The Kid LAROI,...
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.largeCard} accessibilityRole="button">
              <ExpoImage
                source={{
                  uri: 'https://via.placeholder.com/300x300/8B5CF6/FFFFFF?text=RELEASE+RADAR',
                }}
                style={styles.largeCardImage}
                contentFit="cover"
              />
              <View style={styles.largeCardOverlay}>
                <Text style={styles.largeCardTitle}>Release Radar</Text>
              </View>
              <Text style={styles.largeCardDescription} numberOfLines={2}>
                Catch all the latest music from artists you follow, pl...
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.largeCard} accessibilityRole="button">
              <ExpoImage
                source={{
                  uri: 'https://via.placeholder.com/300x300/FF6B9D/FFFFFF?text=DISCOVER',
                }}
                style={styles.largeCardImage}
                contentFit="cover"
              />
              <View style={styles.largeCardOverlay}>
                <Text style={styles.largeCardTitle}>Discover Weekly</Text>
              </View>
              <Text style={styles.largeCardDescription} numberOfLines={2}>
                Olivia De sombr, A
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Made For [username] Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Made For {username}</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <TouchableOpacity
                key={num}
                style={styles.largeCard}
                accessibilityRole="button"
              >
                <ExpoImage
                  source={{
                    uri: `https://via.placeholder.com/300x300/${Math.floor(Math.random() * 16777215).toString(16)}/FFFFFF?text=Daily+Mix+0${num}`,
                  }}
                  style={styles.largeCardImage}
                  contentFit="cover"
                />
                <View style={styles.dailyMixBanner}>
                  <View style={styles.dailyMixBadge}>
                    <Text style={styles.dailyMixBadgeText}>Daily Mix</Text>
                  </View>
                  <View style={styles.dailyMixBadge}>
                    <Text style={styles.dailyMixBadgeText}>0{num}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterButtonsRow: {
    flexDirection: 'row',
    gap: 8,
    flex: 1,
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
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: 'transparent',
  },
  filterButtonActive: {
    backgroundColor: '#1DB954',
    borderColor: '#1DB954',
  },
  filterButtonSecondary: {
    borderColor: '#FF6B9D',
  },
  filterButtonText: {
    color: '#B3B3B3',
    fontSize: 14,
    fontWeight: '600',
  },
  filterButtonTextActive: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  filterButtonTextSecondary: {
    color: '#FF6B9D',
    fontSize: 14,
    fontWeight: '600',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 24,
  },
  gridCard: {
    width: CARD_WIDTH,
    marginBottom: 16,
  },
  cardContent: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  djCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  djIcon: {
    alignItems: 'center',
  },
  djText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  betaText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  albumCollage: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 2,
  },
  collageRow: {
    flexDirection: 'row',
    width: '50%',
    height: '50%',
    gap: 2,
  },
  collageItem: {
    flex: 1,
  },
  edmText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  thisIsCard: {
    alignItems: 'center',
  },
  thisIsText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  artistPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    opacity: 0.3,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  horizontalScroll: {
    paddingHorizontal: 16,
    gap: 16,
  },
  largeCard: {
    width: 180,
    marginRight: 16,
  },
  largeCardImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
    marginBottom: 8,
  },
  largeCardOverlay: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
  },
  largeCardTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  largeCardDescription: {
    color: '#B3B3B3',
    fontSize: 13,
    marginTop: 4,
  },
  dailyMixBanner: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dailyMixBadge: {
    backgroundColor: '#FFD93D',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  dailyMixBadgeText: {
    color: '#121212',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

