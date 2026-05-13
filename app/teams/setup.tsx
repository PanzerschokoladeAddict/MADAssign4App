import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SetUpScreen() {
  const router = useRouter();

  const handlePress = (route: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push(route);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button
        style={styles.button}
        contentStyle={styles.buttonContent}
        mode="contained"
        buttonColor="#8f3f3f"
        onPress={() => {
          handlePress("./create/register");
        }}
      >
        Create A New Team
      </Button>
      <Button
        style={styles.button}
        contentStyle={styles.buttonContent}
        mode="contained"
        buttonColor="#3f488f"
        onPress={() => {
          handlePress("./join/join");
        }}
      >
        Join An Existing Team
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  button: {
    flex: 1,
    marginVertical: 6,
    justifyContent: "center",
  },
  buttonContent: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: "40%",
  },
});
