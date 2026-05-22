import React from "react";
import { Text, View } from "react-native";

export default function MapScreenWeb({ results }: any) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Maps are not supported on web</Text>
      <Text>{results?.length ?? 0} activities loaded</Text>
    </View>
  );
}