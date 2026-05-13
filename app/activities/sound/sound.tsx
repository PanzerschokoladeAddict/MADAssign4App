import { StyleSheet, Text, View } from "react-native";

export default function SoundActivity() {
  return (
    <View style={styles.container}>
      <Text>Sound Activity</Text>
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
