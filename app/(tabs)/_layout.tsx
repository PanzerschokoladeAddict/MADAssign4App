import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#4c8f3f" }}>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
