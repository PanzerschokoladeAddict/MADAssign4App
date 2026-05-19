import { getTeamName, saveResultsData } from "@/services/firestoreService";
import React, { useRef, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type GameStatus = "idle" | "waiting" | "ready" | "finished";

export default function ReactionActivity() {
  const [status, setStatus] = useState<GameStatus>("idle");
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);

  const startTimeRef = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startChallenge = () => {
    setStatus("waiting");
    setReactionTime(null);
    setSaved(false);

    const randomDelay = Math.floor(Math.random() * 3000) + 2000;

    timeoutRef.current = setTimeout(() => {
      startTimeRef.current = Date.now();
      setStatus("ready");
    }, randomDelay);
  };

  const handleTap = () => {
    if (status === "waiting") {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setStatus("idle");
      Alert.alert("Too early!", "Wait until the screen says TAP NOW.");
      return;
    }

    if (status === "ready") {
      const result = Date.now() - startTimeRef.current;
      setReactionTime(result);
      setStatus("finished");

      if (bestTime === null || result < bestTime) {
        setBestTime(result);
      }
    }
  };

  const resetChallenge = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setStatus("idle");
    setReactionTime(null);
  };

  const handleSave = async () => {
    try {
      const teamName = await getTeamName();
      await saveResultsData(teamName, "reaction", {
        reactionTime,
        bestTime,
      });
      setSaved(true);
    } catch (e) {
      console.error(e);
    }
  };

  const getInstructionText = () => {
    if (status === "idle") {
      return "Tap Start Challenge. Wait for the signal, then tap as fast as you can.";
    }

    if (status === "waiting") {
      return "Wait for it...";
    }

    if (status === "ready") {
      return "TAP NOW!";
    }

    return "Challenge complete. Try again to improve your score.";
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reaction Board Challenge</Text>
      <Text style={styles.description}>
        Test your reaction time by tapping only when the signal appears.
      </Text>

      <TouchableOpacity
        style={[
          styles.reactionBox,
          status === "ready" && styles.readyBox,
          status === "waiting" && styles.waitingBox,
        ]}
        onPress={handleTap}
        disabled={status === "idle" || status === "finished"}
      >
        <Text style={styles.reactionText}>{getInstructionText()}</Text>
      </TouchableOpacity>

      {reactionTime !== null && (
        <View style={styles.resultCard}>
          <Text style={styles.resultLabel}>Your reaction time:</Text>
          <Text style={styles.resultValue}>{reactionTime} ms</Text>
        </View>
      )}

      {bestTime !== null && (
        <Text style={styles.bestText}>Best time: {bestTime} ms</Text>
      )}

      {status === "finished" && !saved && (
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Results</Text>
        </TouchableOpacity>
      )}

      {saved && <Text style={styles.savedText}>✅ Saved!</Text>}

      {status === "idle" || status === "finished" ? (
        <TouchableOpacity style={styles.button} onPress={startChallenge}>
          <Text style={styles.buttonText}>
            {status === "finished" ? "Try Again" : "Start Challenge"}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={resetChallenge}
        >
          <Text style={styles.secondaryButtonText}>Cancel</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.note}>
        STEMM link: This activity helps students explore human response time and
        compare results through repeated trials.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 12,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 24,
  },
  reactionBox: {
    minHeight: 180,
    borderRadius: 20,
    backgroundColor: "#d9d9d9",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginBottom: 24,
  },
  waitingBox: {
    backgroundColor: "#f2c94c",
  },
  readyBox: {
    backgroundColor: "#9b59b6",
  },
  reactionText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a1a",
    textAlign: "center",
  },
  resultCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  resultLabel: {
    fontSize: 16,
    color: "#555",
  },
  resultValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  bestText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a1a1a",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#1a1a1a",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#3a7bd5",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 8,
  },
  secondaryButton: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  secondaryButtonText: {
    color: "#1a1a1a",
    fontSize: 16,
    fontWeight: "bold",
  },
  savedText: {
    color: "green",
    textAlign: "center",
    marginBottom: 8,
    fontSize: 16,
  },
  note: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
    lineHeight: 18,
  },
});
