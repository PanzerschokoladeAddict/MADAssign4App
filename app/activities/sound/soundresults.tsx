import { StyleSheet, Text, View } from "react-native";

export default function SoundResults() {
  return (
    <View style={styles.container}>
      <Text>Sound Results</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
