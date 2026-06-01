import ScreenWrapper from "@/components/ScreenWrapper";
import { saveTeamData } from "@/services/firestoreService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import QRCode from "react-native-qrcode-svg";

export default function Create() {
  const { teamName, teamLeader, teamCode } = useLocalSearchParams<{
    teamName: string;
    teamLeader: string;
    teamCode: string;
  }>();

  const router = useRouter();
  const qrValue = JSON.stringify({ teamName, teamLeader, teamCode });

  useEffect(() => {
    if (!teamName || !teamLeader || !teamCode) return;
    // Save team data to Firestore when loading this screen
    saveTeamData(teamName, teamLeader, teamCode).catch(console.error);
    AsyncStorage.setItem("teamName", teamName);
    AsyncStorage.setItem("teamLeader", teamLeader);
    AsyncStorage.setItem("teamCode", teamCode);
  }, [teamName, teamLeader, teamCode]);

  if (!teamName || !teamLeader || !teamCode) return null;

  return (
    <ScreenWrapper style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Team Created!
      </Text>

      <View style={styles.infoCard}>
        <Text variant="titleMedium" style={styles.label}>
          Team Name
        </Text>
        <Text variant="bodyLarge" style={styles.value}>
          {teamName}
        </Text>

        <Text variant="titleMedium" style={styles.label}>
          Team Leader
        </Text>
        <Text variant="bodyLarge" style={styles.value}>
          {teamLeader}
        </Text>

        <Text variant="titleMedium" style={styles.label}>
          Team Code
        </Text>
        <Text variant="bodyLarge" style={styles.value}>
          {teamCode}
        </Text>
      </View>

      <Text variant="bodyMedium" style={styles.qrLabel}>
        Share this QR code for others to join your team!
      </Text>

      <QRCode value={qrValue} size={200} />

      <Button
        mode="contained"
        buttonColor="#4c8f3f"
        style={{ marginTop: 24 }}
        onPress={() => router.replace("../../(tabs)/home")}
      >
        Start Activities
      </Button>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 24,
  },
  infoCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 50,
    marginBottom: 24,
    gap: 4,
    width: "100%",
  },
  label: {
    fontWeight: "bold",
    color: "#666",
    marginTop: 8,
  },
  value: {
    color: "#333",
    fontWeight: "500",
    fontSize: 16,
  },
  qrLabel: {
    color: "#555",
    textAlign: "center",
    marginBottom: 12,
  },
});
