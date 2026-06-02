import ScreenWrapper from "@/components/ScreenWrapper";
import {
  getRecordingPermissionsAsync,
  RecordingPresets,
  requestRecordingPermissionsAsync,
  setAudioModeAsync,
  useAudioRecorder,
  useAudioRecorderState,
} from "expo-audio";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";

const ACTIONS = [
  "Action 1 - Drop an Item",
  "Action 2 - Say something",
  "Action 3 - Stomp your feet",
];

function getRiskLevel(db: number): { label: string; color: string } {
  if (db < 30) return { label: "No risk", color: "#4c8f3f" };
  if (db < 60) return { label: "Safe for long periods", color: "#4c8f3f" };
  if (db < 85)
    return { label: "Generally safe, fatigue possible", color: "#e8a838" };
  if (db < 90) return { label: "Hearing damage possible", color: "#e67e22" };
  if (db < 100) return { label: "Hearing damage likely", color: "#e67e22" };
  if (db < 110) return { label: "Serious damage in minutes", color: "#e74c3c" };
  if (db < 120)
    return { label: "Painful, immediate damage possible", color: "#e74c3c" };
  if (db < 130)
    return { label: "Immediate and severe damage", color: "#c0392b" };
  return { label: "Instant permanent damage", color: "#c0392b" };
}

export default function SoundActivity() {
  const router = useRouter();
  const [currentDB, setCurrentDB] = useState(0);
  const [currentAction, setCurrentAction] = useState(0);
  const [results, setResults] = useState<
    { action: string; db: number; risk: string; color: string }[]
  >([]);

  const audioRecorder = useAudioRecorder({
    ...RecordingPresets.HIGH_QUALITY,
    isMeteringEnabled: true,
  });
  const recorderState = useAudioRecorderState(audioRecorder, 100);

  const getRecordingPermissions = async () => {
    const { status } = await getRecordingPermissionsAsync();
    if (status !== "granted") {
      await requestRecordingPermissionsAsync();
    }
  };

  useEffect(() => {
    (async () => {
      await getRecordingPermissions();
      await setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
      });
    })();
  }, []);

  useEffect(() => {
    if (recorderState.isRecording && recorderState.metering !== undefined) {
      const raw = recorderState.metering;
      const scaled = Math.round((raw + 60) * (70 / 60) + 30 ); // Scale -60 to 0 dB range into 30 to 100 dB range
      const clamped = Math.max(30, Math.min(130, scaled)); // Clamp to 30-100 dB
      setCurrentDB(clamped);
    }
  }, [recorderState.metering]);

  const record = async () => {
    await audioRecorder.prepareToRecordAsync();
    audioRecorder.record();
  };

  const stopRecording = async () => {
    await audioRecorder.stop();
    const { label, color } = getRiskLevel(currentDB);
    const newResult = {
      action: ACTIONS[currentAction],
      db: currentDB,
      risk: label,
      color,
    };
    const updated = [...results, newResult];
    setResults(updated);

    if (currentAction < ACTIONS.length - 1) {
      setCurrentAction(currentAction + 1);
      setCurrentDB(0);
    } else {
      router.push({
        pathname: "/activities/sound/soundresults",
        params: { results: JSON.stringify(updated) },
      });
    }
  };

  return (
    <ScreenWrapper style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Sound Pollution Hunter
      </Text>

      <Text variant="bodyMedium" style={styles.actionLabel}>
        Action {currentAction + 1} of {ACTIONS.length}
      </Text>
      <Text variant="titleMedium" style={styles.actionName}>
        {ACTIONS[currentAction]}
      </Text>

      {results.map((r, i) => (
        <Text key={i} style={[styles.resultRow, { color: r.color }]}>
          {r.action}: {r.db} dB — {r.risk}
        </Text>
      ))}

      {recorderState.isRecording && (
        <Text variant="displaySmall" style={styles.db}>
          {currentDB} dB
        </Text>
      )}

      <Button
        mode="contained"
        buttonColor={recorderState.isRecording ? "#8f3f3f" : "#4c8f3f"}
        style={styles.button}
        onPress={recorderState.isRecording ? stopRecording : record}
      >
        {recorderState.isRecording ? "Stop Recording" : "Start Recording"}
      </Button>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
  },
  actionLabel: {
    textAlign: "center",
    color: "#999",
    marginBottom: 4,
  },
  actionName: {
    textAlign: "center",
    marginBottom: 16,
  },
  resultRow: {
    marginBottom: 8,
    fontSize: 14,
  },
  db: {
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 16,
  },
  button: {
    marginTop: 16,
  },
});
