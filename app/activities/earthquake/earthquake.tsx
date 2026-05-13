import { StyleSheet, Text, View } from "react-native";

export default function EarthquakeActivity() {
  return (
    <View style={styles.container}>
      <Text>Earthquake Activity</Text>
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
