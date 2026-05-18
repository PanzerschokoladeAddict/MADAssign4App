import { saveResultsData } from "@/services/firestoreService";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

type ActionResult = {
  action: string;
  db: number;
  risk: string;
  color: string;
};

export default function SoundResults() {
  const { results } = useLocalSearchParams<{ results: string }>();
  const router = useRouter();
  const [saved, setSaved] = useState(false);

  const parsed: ActionResult[] = results ? JSON.parse(results) : [];
  const loudest = parsed.reduce((a, b) => (a.db > b.db ? a : b), parsed[0]);

  const handleSave = async () => {
    try {
      await saveResultsData("Team", "sound", {
        actions: parsed,
        loudestAction: loudest?.action,
        loudestDb: loudest?.db,
      });
      setSaved(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text variant="headlineMedium" style={styles.title}>
          Sound Results
        </Text>

        {parsed.map((r, i) => (
          <View key={i} style={styles.row}>
            <Text variant="bodyMedium" style={styles.action}>
              {r.action}
            </Text>
            <Text variant="titleMedium" style={{ color: r.color }}>
              {r.db} dB — {r.risk}
            </Text>
          </View>
        ))}

        {loudest && (
          <View style={styles.loudestCard}>
            <Text variant="bodyMedium" style={styles.loudestLabel}>
              Loudest Action
            </Text>
            <Text variant="titleMedium">{loudest.action}</Text>
            <Text variant="headlineSmall" style={{ color: loudest.color }}>
              {loudest.db} dB — {loudest.risk}
            </Text>
          </View>
        )}

        {!saved ? (
          <Button
            mode="contained"
            buttonColor="#3a7bd5"
            style={styles.button}
            onPress={handleSave}
          >
            Save Results
          </Button>
        ) : (
          <Text style={styles.saved}>✅ Saved!</Text>
        )}

        <Button
          mode="contained"
          buttonColor="#4c8f3f"
          style={styles.button}
          onPress={() => router.replace("/(tabs)/home")}
        >
          Back to Home
        </Button>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", paddingHorizontal: 24 },
  title: { textAlign: "center", marginBottom: 24 },
  row: { marginBottom: 12 },
  action: { color: "#666", marginBottom: 2 },
  loudestCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
    alignItems: "center",
    gap: 4,
  },
  loudestLabel: { color: "#999" },
  button: { marginTop: 8 },
  saved: {
    color: "#4c8f3f",
    textAlign: "center",
    marginVertical: 8,
    fontSize: 16,
  },
});
