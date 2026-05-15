import { useLocalSearchParams, useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

type ActionResult = {
  action: string;
  db: number;
  risk: string;
  color: string;
};

export default function SoundResults() {
  const { results } = useLocalSearchParams<{ results: string }>();
  const router = useRouter();

  const parsed: ActionResult[] = results ? JSON.parse(results) : [];
  const loudest = parsed.reduce((a, b) => (a.db > b.db ? a : b), parsed[0]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sound Results</Text>

      {parsed.map((r, i) => (
        <View key={i} style={styles.row}>
          <Text style={styles.action}>{r.action}</Text>
          <Text style={[styles.db, { color: r.color }]}>
            {r.db} dB — {r.risk}
          </Text>
        </View>
      ))}

      {loudest && (
        <View style={styles.loudestCard}>
          <Text style={styles.loudestLabel}>Loudest Action</Text>
          <Text style={styles.loudestAction}>{loudest.action}</Text>
          <Text style={[styles.loudestDb, { color: loudest.color }]}>
            {loudest.db} dB — {loudest.risk}
          </Text>
        </View>
      )}

      <Button
        title="Back to Home"
        onPress={() => router.replace("/(tabs)/home")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#ecf0f1",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  row: {
    marginBottom: 12,
  },
  action: {
    fontSize: 14,
    color: "#666",
  },
  db: {
    fontSize: 20,
    fontWeight: "bold",
  },
  loudestCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
    alignItems: "center",
  },
  loudestLabel: {
    fontSize: 14,
    color: "#999",
    marginBottom: 4,
  },
  loudestAction: {
    fontSize: 16,
    fontWeight: "600",
  },
  loudestDb: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 4,
  },
  saved: {
    color: "green",
    textAlign: "center",
    marginVertical: 8,
  },
});
