import { StyleSheet, Text, View } from "react-native";

export default function ReactionActivity() {
  return (
    <View style={styles.container}>
      <Text>Reaction Activity</Text>
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
