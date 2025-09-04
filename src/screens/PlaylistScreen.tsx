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
  { title: "DJ", subtitle: "Tap to start" },
  { title: "sunday afternoons", subtitle: "Playlist • yves" },
  { title: "in too deep", subtitle: "Playlist • yves" },
  { title: "+++", subtitle: "Playlist • yves" },
  { title: "emo itch", subtitle: "Playlist • yves" },
  { title: "opm", subtitle: "Playlist • yves" },
];

const LibraryScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={{
              uri: "https://scontent.fceb1-1.fna.fbcdn.net/v/t39.30808-6/460808947_2253566331662462_5810863963435705191_n.jpg",
            }}
            style={styles.avatar}
          />
          <Text style={styles.title}>Your Library</Text>
        </View>

        {/* Filter Tabs */}
        <View style={styles.tabRow}>
          {["Playlists", "Podcasts", "Albums", "Artists"].map((tab, index) => (
            <TouchableOpacity key={index} style={styles.tab}>
              <Text style={styles.tabText}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Playlist List */}
        <View>
          {playlists.map((item, index) => (
            <View key={index} style={styles.playlistItem}>
              <View style={styles.playlistImage} />
              <View>
                <Text style={styles.playlistTitle}>{item.title}</Text>
                <Text style={styles.playlistSubtitle}>{item.subtitle}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Now Playing Bar */}
      <View style={styles.nowPlayingBar}>
        <Image
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/en/e/e1/Spandau_Ballet_True_album_cover.jpg",
          }}
          style={styles.songImage}
        />
        <View style={styles.songInfo}>
          <Text style={styles.songTitle}>True - 2003 Remaster</Text>
          <Text style={styles.songArtist}>Spandau Ballet</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.pauseButton}>⏸</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  tabRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 12,
    flexWrap: "wrap",
  },
  tab: {
    backgroundColor: "#2a2a2a",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  tabText: {
    color: "#fff",
    fontSize: 13,
  },
  playlistItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  playlistImage: {
    width: 50,
    height: 50,
    backgroundColor: "#4ade80",
    borderRadius: 4,
    marginRight: 12,
  },
  playlistTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  playlistSubtitle: {
    color: "#bbb",
    fontSize: 13,
    marginTop: 2,
  },
  nowPlayingBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7f1d1d",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  songImage: {
    width: 40,
    height: 40,
    borderRadius: 4,
    marginRight: 10,
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  songArtist: {
    color: "#bbb",
    fontSize: 12,
  },
  pauseButton: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
});

export default LibraryScreen;
