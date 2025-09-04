import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

const ProfileScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={{ color: "white", fontSize: 20 }}>←</Text>
        </TouchableOpacity>

        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=12" }} // profile avatar
          style={styles.avatar}
        />

        <Text style={styles.name}>yves</Text>
        <Text style={styles.subText}>1 follower • 100 following</Text>

        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.iconText}>⇪</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.iconText}>⋯</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Playlists */}
      <Text style={styles.sectionTitle}>Playlists</Text>
      {[
        { title: "bp" },
        { title: "revelations" },
        { title: "knight" },
      ].map((item, i) => (
        <View key={i} style={styles.playlistRow}>
          <View style={styles.playlistImage} />
          <View>
            <Text style={styles.playlistText}>{item.title}</Text>
            <Text style={styles.subText}>0 saves • yves</Text>
          </View>
        </View>
      ))}
      <TouchableOpacity style={styles.seeAllButton}>
        <Text style={styles.seeAllText}>See all playlists</Text>
      </TouchableOpacity>

      {/* Recently played artists */}
      <Text style={styles.sectionTitle}>Recently played artists</Text>
      {[
        { name: "Cliff Richard", followers: "376,954" },
        { name: "Dan Fogelberg", followers: "821,296" },
      ].map((artist, i) => (
        <View key={i} style={styles.artistRow}>
          <View style={styles.artistImage} />
          <View>
            <Text style={styles.artistName}>{artist.name}</Text>
            <Text style={styles.subText}>{artist.followers} followers</Text>
          </View>
        </View>
      ))}

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {["Home", "Search", "Your Library", "Create"].map((item, i) => (
          <TouchableOpacity key={i} style={styles.navItem}>
            <Text style={styles.navText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    position: "absolute",
    top: 0,
    left: 0,
    padding: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  name: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
  },
  subText: {
    color: "#aaa",
    fontSize: 13,
    marginBottom: 6,
  },
  headerButtons: {
    flexDirection: "row",
    marginTop: 10,
  },
  editButton: {
    backgroundColor: "#2a2a2a",
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  editText: {
    color: "white",
    fontSize: 14,
  },
  iconButton: {
    backgroundColor: "#2a2a2a",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  iconText: {
    color: "white",
    fontSize: 14,
  },
  sectionTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
    marginVertical: 12,
  },
  playlistRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  playlistImage: {
    width: 50,
    height: 50,
    backgroundColor: "#4ade80",
    borderRadius: 6,
    marginRight: 12,
  },
  playlistText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  seeAllButton: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 20,
    alignSelf: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginVertical: 10,
  },
  seeAllText: {
    color: "white",
    fontSize: 14,
  },
  artistRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  artistImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#4ade80",
    marginRight: 12,
  },
  artistName: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#2a2a2a",
    marginTop: 30,
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    color: "white",
    fontSize: 12,
  },
});

export default ProfileScreen;
