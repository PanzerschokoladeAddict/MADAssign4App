import { CameraView, useCameraPermissions } from "expo-camera";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function CameraJoin() {
  const [permission, requestPermission] = useCameraPermissions();
  const router = useRouter();

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    requestPermission();
  }

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.message}>
          We need your permission to use the camera
        </Text>
        <Button
          onPress={() => {
            handlePress()
          }}
          mode="contained"
          buttonColor="#3f648f"
        >
          Grant Permission
        </Button>
      </View>
    );
  }

  function handleBarcodeScanned({ data }: { data: string }) {
    let teamParams: {
      teamName: string;
      teamLeader?: string;
      teamCode?: string;
    } = { teamName: data };

    try {
      const parsed = JSON.parse(data);
      if (parsed?.teamName && parsed?.teamLeader) {
        teamParams = {
          teamName: parsed.teamName,
          teamLeader: parsed.teamLeader,
          teamCode: parsed.teamCode,
        };
      }
    } catch {
      // If the QR code contains just the team name, fallback to that string.
    }

    router.push({ pathname: "./joined", params: teamParams });
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <CameraView
          style={styles.camera}
          facing="back"
          onBarcodeScanned={handleBarcodeScanned}
          barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        />
        <Text style={styles.instructions}>
          Point your camera at a team QR code
        </Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  permissionContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  message: {
    textAlign: "center",
    paddingBottom: 16,
    fontSize: 16,
  },
  camera: {
    flex: 1,
  },
  instructions: {
    textAlign: "center",
    padding: 16,
    fontSize: 16,
  },
});