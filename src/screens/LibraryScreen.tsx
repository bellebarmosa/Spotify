import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

const playlists = [
  { title: "Liked Songs", subtitle: "Playlist • 529 songs" },
  { title: "DJ", subtitle: "Tap to start", isBeta: true },
  { title: "sunday afternoons", subtitle: "Playlist • yves" },
  { title: "in too deep", subtitle: "Playlist • yves" },
  { title: "+++", subtitle: "Playlist • yves" },
  { title: "emo itch", subtitle: "Playlist • yves" },
  { title: "opm", subtitle: "Playlist • yves" },
];

const LibraryScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://scontent.fceb1-1.fna.fbcdn.net/v/t39.30808-6/460808947_2253566331662462_5810863963435705191_n.jpg", // profile picture
          }}
          style={styles.avatar}
        />
        <Text style={styles.title}>Your Library</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsRow}>
        {["Playlists", "Podcasts", "Albums", "Artists"].map((tab, index) => (
          <TouchableOpacity key={index} style={styles.tab}>
            <Text style={styles.tabText}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Playlist List */}
      <View style={styles.playlistList}>
        {playlists.map((item, i) => (
          <TouchableOpacity key={i} style={styles.playlistItem}>
            <View style={styles.thumbnail}>
              {item.isBeta ? (
                <View style={styles.djThumbnail}>
                  <Text style={styles.betaText}>DJ</Text>
                </View>
              ) : (
                <View style={styles.defaultThumbnail} />
              )}
            </View>
            <View>
              <Text style={styles.playlistTitle}>{item.title}</Text>
              <Text style={styles.playlistSubtitle}>{item.subtitle}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bottom Now Playing Bar */}
      {/* Removed due to missing asset: true_cover.png */}
      {/* <View style={styles.nowPlaying}>
        <Image
          source={require("../assets/true_cover.png")} // replace with real path if needed
          style={styles.songCover}
        />
        <View style={styles.songInfo}>
          <Text style={styles.songTitle}>True - 2003 Remaster</Text>
          <Text style={styles.songArtist}>Spandau Ballet</Text>
        </View>
        <TouchableOpacity style={styles.pauseButton}>
          <Text style={styles.pauseText}>⏸</Text>
        </TouchableOpacity>
      </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  tabsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  tab: {
    backgroundColor: "#2a2a2a",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  tabText: {
    color: "#fff",
    fontSize: 13,
  },
  playlistList: {
    marginBottom: 80,
  },
  playlistItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  thumbnail: {
    width: 56,
    height: 56,
    backgroundColor: "#4ade80",
    borderRadius: 6,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  defaultThumbnail: {
    width: 40,
    height: 40,
    backgroundColor: "#16a34a",
    borderRadius: 4,
  },
  djThumbnail: {
    backgroundColor: "#1db954",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  betaText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  playlistTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
  },
  playlistSubtitle: {
    color: "#999",
    fontSize: 13,
  },
  // Removed nowPlaying and songCover styles due to missing asset
  // nowPlaying: {
  //   position: "absolute",
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   backgroundColor: "#450a0a",
  //   flexDirection: "row",
  //   alignItems: "center",
  //   padding: 12,
  // },
  // songCover: {
  //   width: 40,
  //   height: 40,
  //   borderRadius: 4,
  //   marginRight: 10,
  //   backgroundColor: "#fff",
  // },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  songArtist: {
    color: "#999",
    fontSize: 12,
  },
  pauseButton: {
    padding: 8,
  },
  pauseText: {
    fontSize: 20,
    color: "#fff",
  },
});

export default LibraryScreen;
