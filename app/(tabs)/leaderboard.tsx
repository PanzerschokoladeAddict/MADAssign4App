import { getResults } from "@/services/firestoreService";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

type Result = {
  id: string;
  teamName: string;
  activityType: string;
  data: any;
  createdAt: any;
};

export default function LeaderboardScreen() {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getResults()
      .then((data) => {
        setResults(data as Result[]);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  const getActivityEmoji = (type: string) => {
    if (type === "sound") return "🎤";
    if (type === "reaction") return "⚡";
    if (type === "earthquake") return "🏗️";
    return "📊";
  };

  const getSummary = (result: Result) => {
    if (result.activityType === "sound") {
      return `Loudest: ${result.data?.loudestDb ?? "??"} dB`;
    }
    if (result.activityType === "reaction") {
      return `Reaction: ${result.data?.reactionTime ?? "??"} ms`;
    }
    if (result.activityType === "earthquake") {
      return `Peak: ${result.data?.peakAcceleration ?? "??"} m/s²`;
    }
    return "";
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text variant="headlineMedium" style={styles.title}>
          Leaderboard
        </Text>

        {loading && (
          <Text variant="bodyMedium" style={styles.loading}>
            Loading results...
          </Text>
        )}

        {!loading && results.length === 0 && (
          <Text variant="bodyMedium" style={styles.empty}>
            No results yet. Complete an activity to see scores here!
          </Text>
        )}

        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View style={styles.card}>
              <Text style={styles.rank}>#{index + 1}</Text>
              <View style={styles.cardContent}>
                <Text variant="titleMedium" style={styles.teamName}>
                  {getActivityEmoji(item.activityType)} {item.teamName}
                </Text>
                <Text variant="bodyMedium" style={styles.activity}>
                  {item.activityType.charAt(0).toUpperCase() +
                    item.activityType.slice(1)}{" "}
                  — {getSummary(item)}
                </Text>
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  title: { textAlign: "center", margin: 24 },
  loading: { textAlign: "center", color: "#999" },
  empty: { textAlign: "center", color: "#999", paddingHorizontal: 24 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  rank: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4c8f3f",
    marginRight: 16,
    width: 36,
  },
  cardContent: { flex: 1 },
  teamName: { fontWeight: "bold" },
  activity: { color: "#666", marginTop: 2 },
});
