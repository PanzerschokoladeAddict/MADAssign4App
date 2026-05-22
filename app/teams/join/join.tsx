import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Join() {
  const router = useRouter();

  const handlePress = (route: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push(route);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Button 
        onPress={() => 
          handlePress("./join/codejoin")
        }
        >
          Enter Code
        </Button>
        <Button
        onPress={() =>
          handlePress("./join/camerajoin")
        }
        >
          Join via QR Code
        </Button>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
