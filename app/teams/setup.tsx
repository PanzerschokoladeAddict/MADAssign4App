import ScreenWrapper from "@/components/ScreenWrapper";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { Button, Divider } from "react-native-paper";

export default function SetUpScreen() {
  const router = useRouter();

  const handlePress = (route: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push(route);
  };

  return (
    <ScreenWrapper style={styles.container}>
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
      <Divider style={{ marginVertical: 20, width: "100%", height: 8 }} />
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
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
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
