import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const activities = [
  {
    id: "sound",
    title: "Sound Pollution Hunter",
    description: "Measure sound levels using your microphone",
    color: "#3a7bd5",
    icon: "🎤",
    route: "/activities/sound",
  },
  {
    id: "earthquake",
    title: "Earthquake Structure",
    description: "Test your structure using the accelerometer",
    color: "#e8a838",
    icon: "🏗️",
    route: "/activities/earthquake",
  },
  {
    id: "reaction",
    title: "Reaction Board",
    description: "Measure your reaction time",
    color: "#9b59b6",
    icon: "⚡",
    route: "/activities/reaction",
  },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>STEMM Lab</Text>
        <Text style={styles.subtitle}>Choose an Activity</Text>

        {activities.map((activity) => (
          <TouchableOpacity
            key={activity.id}
            style={[styles.card, { backgroundColor: activity.color }]}
            onPress={() => router.push(activity.route as any)}
          >
            <Text style={styles.cardIcon}>{activity.icon}</Text>
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>{activity.title}</Text>
              <Text style={styles.cardDescription}>{activity.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  scroll: { padding: 20 },
  title: { fontSize: 32, fontWeight: "bold", color: "#1a1a1a" },
  subtitle: { fontSize: 16, color: "#666", marginBottom: 24 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  cardIcon: { fontSize: 40, marginRight: 16 },
  cardText: { flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  cardDescription: { fontSize: 14, color: "#fff", opacity: 0.85, marginTop: 4 },
});
