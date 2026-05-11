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
    </Stack>
  );
}
