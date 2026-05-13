import { StyleSheet, Text, View } from "react-native";

export default function EarthquakeResults() {
  return (
    <View style={styles.container}>
      <Text>Earthquake Results</Text>
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
