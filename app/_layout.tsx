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
        name="teams/create/create"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="(tabs)/home" options={{ headerShown: false }} />
      <Stack.Screen
        name="activities/sound"
        options={{ title: "Sound Pollution Hunter" }}
      />
      <Stack.Screen
        name="activities/sound-results"
        options={{ title: "Sound Results" }}
      />
      <Stack.Screen
        name="activities/earthquake"
        options={{ title: "Earthquake Structure" }}
      />
      <Stack.Screen
        name="activities/earthquake-results"
        options={{ title: "Earthquake Results" }}
      />
      <Stack.Screen
        name="activities/reaction"
        options={{ title: "Reaction Board" }}
      />
      <Stack.Screen
        name="activities/reaction-results"
        options={{ title: "Reaction Results" }}
      />
    </Stack>
  );
}
