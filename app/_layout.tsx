import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="teams/setup" />
      <Stack.Screen name="teams/join/join" />
      <Stack.Screen name="teams/create/register" />
      <Stack.Screen name="teams/create/created" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="activities/sound/sound" />
      <Stack.Screen name="activities/sound/soundresults" />
      <Stack.Screen name="activities/earthquake/earthquake" />
      <Stack.Screen name="activities/earthquake/earthquakeresults" />
      <Stack.Screen name="activities/reaction/reaction" />
      <Stack.Screen name="activities/reaction/reactionresults" />
    </Stack>
  );
}
