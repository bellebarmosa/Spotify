import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

const HomeScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Top Row */}
      <View style={styles.topRow}>
        <Image
          source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaxtxThTArhQKSGAsN0VqZ9r2GbQyRDbV9Gg&s" }} // replace with profile pic
          style={styles.avatar}
        />
        <View style={styles.tabsRow}>
          {["All", "Music", "Podcasts"].map((tab, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.tab, index === 0 && styles.activeTab]}
            >
              <Text
                style={[styles.tabText, index === 0 && styles.activeTabText]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Playlist Grid */}
      <View style={styles.grid}>
        {[
          { title: "DJ" },
          { title: "Liked Songs" },
          { title: "in too deep" },
          { title: "trash taste" },
          { title: "sunday afternoons" },
          { title: "Dark Red" },
          { title: "emo itch" },
          { title: "Red Hot Chili Peppers" },
        ].map((item, i) => (
          <View key={i} style={styles.gridItem}>
            <View style={styles.gridImage} />
            <Text style={styles.gridText}>{item.title}</Text>
          </View>
        ))}
      </View>

      {/* DJ Banner */}
      <Text style={styles.sectionTitle}>Your own personal DJ</Text>
      <View style={styles.djBanner}>
        <View style={styles.djBadge}>
          <Text style={styles.djBadgeText}>Beta</Text>
        </View>
        <Text style={styles.djText}>
          Hey your DJ is here. I’m ready to scratch that discovery itch
        </Text>
      </View>

      {/* Charts */}
      <Text style={styles.sectionTitle}>Charts</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {["Top 50", "Hot Hits", "Viral 50"].map((chart, i) => (
          <View key={i} style={styles.chartCard}>
            <View style={styles.chartImage} />
            <Text style={styles.chartText}>{chart}</Text>
          </View>
        ))}
      </ScrollView>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  tabsRow: {
    flexDirection: "row",
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: "#2a2a2a",
    marginRight: 8,
  },
  activeTab: {
    backgroundColor: "#1DB954",
  },
  tabText: {
    color: "#bbb",
    fontSize: 14,
  },
  activeTabText: {
    color: "#000",
    fontWeight: "600",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    width: "48%",
    backgroundColor: "#1e1e1e",
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 8,
  },
  gridImage: {
    width: 40,
    height: 40,
    backgroundColor: "#4ade80",
    borderRadius: 4,
    marginRight: 8,
  },
  gridText: {
    color: "white",
    fontSize: 14,
    flexShrink: 1,
  },
  sectionTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 8,
  },
  djBanner: {
    backgroundColor: "#1e40af",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  djBadge: {
    backgroundColor: "#2a2a2a",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 8,
  },
  djBadgeText: {
    color: "white",
    fontSize: 12,
  },
  djText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  chartCard: {
    width: 140,
    marginRight: 12,
  },
  chartImage: {
    width: "100%",
    height: 140,
    borderRadius: 8,
    backgroundColor: "#4ade80",
    marginBottom: 6,
  },
  chartText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
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

export default HomeScreen;
