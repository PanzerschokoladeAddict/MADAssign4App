import ScreenWrapper from "@/components/ScreenWrapper";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { Button, Divider } from "react-native-paper";

export default function Join() {
  const router = useRouter();

  const handlePress = (route: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push(route);
  };

  return (
    <ScreenWrapper style={styles.container}>
      <Button 
        onPress={() => 
          handlePress("../join/codejoin")
        }
        >
          Enter Code
      </Button>
      <Divider style={{ marginVertical: 20, width: "80%", height: 8 }} />
      <Button
        onPress={() =>
          handlePress("../join/camerajoin")
        }
      >
        Join via QR Code
      </Button>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
