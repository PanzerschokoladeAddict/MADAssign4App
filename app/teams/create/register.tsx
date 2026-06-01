import ScreenWrapper from "@/components/ScreenWrapper";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React from "react";
import { Alert, Image, StyleSheet } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

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

  const handleHapticFeedback = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  return (
    <ScreenWrapper style={styles.container}>
      <Text variant="headlineMedium" style={styles.titletext}>
        Create A New Team
      </Text>

      <Image
        source={require("../../../assets/images/team.png")}
        style={styles.imageStyle}
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
          handleHapticFeedback();
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
          handleHapticFeedback();
          _handleExit();
        }}
      >
        Exit to Home
      </Button>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  button: {
    margin: 16,
  },
  imageStyle: {
    width: 200,
    height: 200,
    alignSelf: "center",
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
