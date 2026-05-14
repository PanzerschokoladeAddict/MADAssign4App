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
import { Button, StyleSheet, Text, View } from "react-native";

const ACTIONS = [
  "Action 1 - Drop an Item",
  "Action 2 - Say something",
  "Action 3 - Stomp your feet",
];

function getRiskLevel(db: number): { label: string; color: string } {
  if (db < 60) {
    return { label: "Low", color: "green" };
  } else if (db < 80) {
    return { label: "Medium", color: "orange" };
  } else {
    return { label: "High", color: "red" };
  }
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
      const { granted } = await requestRecordingPermissionsAsync();
      return granted;
    }
    return true;
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
      setCurrentDB(Math.round(recorderState.metering + 160));
    }
  }, [recorderState.metering]);

  const record = async () => {
    await audioRecorder.prepareToRecordAsync();
    audioRecorder.record();
  };

  const stopRecording = async () => {
    await audioRecorder.stop();
    const risk = getRiskLevel(currentDB);
    const newResult = {
      action: ACTIONS[currentAction],
      db: currentDB,
      risk: risk.label,
      color: risk.color,
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
    <View style={styles.container}>
      <Text style={styles.actionLabel}>
        Action {currentAction + 1} of {ACTIONS.length}
      </Text>
      <Text style={styles.actionName}>{ACTIONS[currentAction]}</Text>

      {recorderState.isRecording && (
        <Text style={styles.db}>{currentDB} dB</Text>
      )}

      <Button
        title={recorderState.isRecording ? "Stop Recording" : "Start Recording"}
        onPress={recorderState.isRecording ? stopRecording : record}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 10,
  },
  db: {
    fontSize: 48,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  actionLabel: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginBottom: 4,
  },
  actionName: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 16,
  },
});
