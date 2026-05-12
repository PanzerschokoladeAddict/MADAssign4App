import * as haptic from "expo-haptics";
import { router } from "expo-router";
import React from "react";
import { Alert, Image, StyleSheet } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Register() {
  const [teamName, setTeamName] = React.useState("");
  const [teamLeader, setTeamLeader] = React.useState("");
  const [teamCode, setTeamCode] = React.useState("");

  async function _handleExit() {
    router.push("../setup");
  }

  async function _handleCreate() {
    if (!teamName || !teamLeader || !teamCode) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    router.push({
      pathname: "./created",
      params: { teamName, teamLeader, teamCode },
    });
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text variant="headlineMedium" style={styles.titletext}>
          Create A New Team
        </Text>

        <Image
          source={require("../../../assets/images/team.png")}
          style={{ width: 200, height: 200, alignSelf: "center" }}
        />

        <TextInput
          label="Team Name"
          value={teamName}
          onChangeText={(text) => setTeamName(text)}
          mode="outlined"
          style={styles.input}
          activeOutlineColor="#4c8f3f"
        />
        <TextInput
          label="Team Leader Name"
          value={teamLeader}
          onChangeText={(text) => setTeamLeader(text)}
          mode="outlined"
          style={styles.input}
          activeOutlineColor="#4c8f3f"
        />
        <TextInput
          label="Team Code"
          value={teamCode}
          onChangeText={(text) => setTeamCode(text)}
          mode="outlined"
          style={styles.input}
          activeOutlineColor="#4c8f3f"
        />

        <Button
          style={styles.button}
          mode="contained"
          buttonColor="#4c8f3f"
          onPress={() => {
            haptic.impactAsync(haptic.ImpactFeedbackStyle.Medium);
            _handleCreate();
          }}
        >
          Register
        </Button>

        <Button
          style={styles.button}
          mode="contained"
          buttonColor="#8f3f3f"
          onPress={() => {
            haptic.impactAsync(haptic.ImpactFeedbackStyle.Medium);
            _handleExit();
          }}
        >
          Exit to Home
        </Button>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    margin: 16,
  },
  input: {
    margin: 16,
    outlineColor: "#4c8f3f",
    backgroundColor: "#fff",
  },
  titletext: {
    margin: 16,
    textAlign: "center",
  },
});
