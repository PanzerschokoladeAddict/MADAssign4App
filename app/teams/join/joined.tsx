import * as Haptics from "expo-haptics";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function Joined() {
  const { teamName, teamLeader, teamCode } = useLocalSearchParams<{
    teamName: string;
    teamLeader: string;
    teamCode: string;
  }>();
  const router = useRouter();

  useEffect(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, []);

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Youre in!
      </Text>
      <Text variant="bodyLarge" style={styles.teamName}>
        Youve joined{"\n"}
        {teamName}
      </Text>
      <Text variant="bodyMedium" style={styles.teamLeader}>
        Your team leader is {teamLeader}
      </Text>
      <Text variant="bodyMedium" style={styles.teamCode}>
        Your team code is {teamCode}
      </Text>
      <Button
        mode="contained"
        buttonColor="#4c8f3f"
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          router.replace("/(tabs)/home");
        }}
        style={styles.button}
      >
        Back to Home
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    padding: 24,
  },
  emoji: {
    fontSize: 72,
  },
  title: {
    fontWeight: "bold",
  },
  teamName: {
    textAlign: "center",
    fontSize: 18,
  },
  button: {
    marginTop: 16,
    width: "70%",
  },
  teamLeader: {
    textAlign: "center",
    fontSize: 16,
    fontStyle: "italic",
  },
  teamCode: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
