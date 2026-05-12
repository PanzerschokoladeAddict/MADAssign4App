import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="teams/setup" options={{ headerShown: false }} />
      <Stack.Screen name="teams/join/join" options={{ headerShown: false }} />
      <Stack.Screen
        name="teams/create/register"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="teams/create/created"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="(tabs)/home" options={{ headerShown: false }} />
      <Stack.Screen
        name="activities/sound/sound"
        options={{ title: "Sound Pollution Hunter" }}
      />
      <Stack.Screen
        name="activities/sound/soundresults"
        options={{ title: "Sound Results" }}
      />
      <Stack.Screen
        name="activities/earthquake/earthquake"
        options={{ title: "Earthquake Structure" }}
      />
      <Stack.Screen
        name="activities/earthquake/earthquakeresults"
        options={{ title: "Earthquake Results" }}
      />
      <Stack.Screen
        name="activities/reaction/reaction"
        options={{ title: "Reaction Board" }}
      />
      <Stack.Screen
        name="activities/reaction/reactionresults"
        options={{ title: "Reaction Results" }}
      />
    </Stack>
  );
}
