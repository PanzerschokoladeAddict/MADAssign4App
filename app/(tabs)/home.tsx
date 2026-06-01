import * as Battery from "expo-battery";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const activities = [
  {
    id: "sound",
    title: "Sound Pollution Hunter",
    description: "Measure sound levels using your microphone",
    color: "#3a7bd5",
    route: "activities/sound/sound",
  },
  {
    id: "earthquake",
    title: "Earthquake Structure",
    description: "Test your structure using the accelerometer",
    color: "#e8a838",
    route: "activities/earthquake/earthquake",
  },
  {
    id: "reaction",
    title: "Reaction Board",
    description: "Measure your reaction time",
    color: "#9b59b6",
    route: "activities/reaction/reaction",
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const [batteryLevel, setBatteryLevel] = useState(0);
  const [isCharging, setIsCharging] = useState(false);

  useEffect(() => {
    Promise.all([
      Battery.getBatteryLevelAsync(),
      Battery.getBatteryStateAsync(),
    ]).then(([level, state]) => {
      setBatteryLevel(level);
      setIsCharging(
        state === Battery.BatteryState.CHARGING ||
          state === Battery.BatteryState.FULL,
      );
    });

    let batteryLevelListener: any;
    let batteryStateListener: any;

    try {
      batteryLevelListener = Battery.addBatteryLevelListener(
        ({ batteryLevel }) => {
          setBatteryLevel(batteryLevel);
        },
      );

      batteryStateListener = Battery.addBatteryStateListener(
        ({ batteryState }) => {
          setIsCharging(
            batteryState === Battery.BatteryState.CHARGING ||
              batteryState === Battery.BatteryState.FULL,
          );
        },
      );
    } catch {
      console.warn("Battery API not supported on this device");
    }

    return () => {
      batteryLevelListener?.remove();
      batteryStateListener?.remove();
    };
  }, []);

  const handlePress = (route: any) => {
    router.push(route);
  };

  const scheduleChallengeReminder = async () => {
    const permission = await Notifications.requestPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Notifications not enabled",
        "Please allow notifications to use challenge reminders.",
      );
      return;
    }

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("challenge-reminders", {
        name: "Challenge Reminders",
        importance: Notifications.AndroidImportance.HIGH,
      });
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "STEMM Lab Reminder",
        body: "Time to complete your STEMM challenge!",
        sound: true,
      },
      trigger: {
        seconds: 10,
        channelId: "challenge-reminders",
      } as any,
    });

    Alert.alert(
      "Reminder set",
      "A challenge reminder notification will appear in 10 seconds.",
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>STEMM Lab</Text>
        <Text>Battery Level: {Math.round(batteryLevel * 100)}%</Text>
        {isCharging && <Text>Charging</Text>}
        <Text style={styles.subtitle}>Choose an Activity</Text>
        <TouchableOpacity
          style={styles.reminderButton}
          onPress={scheduleChallengeReminder}
        >
          <Text style={styles.reminderButtonText}>
            Set 10 sec Challenge Reminder
          </Text>
        </TouchableOpacity>

        {activities.map((activity) => (
          <TouchableOpacity
            key={activity.id}
            style={[styles.card, { backgroundColor: activity.color }]}
            onPress={() => handlePress(activity.route)}
          >
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>{activity.title}</Text>
              <Text style={styles.cardDescription}>{activity.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scroll: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  cardIcon: {
    fontSize: 40,
    marginRight: 16,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  cardDescription: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.85,
    marginTop: 4,
  },
  reminderButton: {
    backgroundColor: "#1a1a1a",
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
  },
  reminderButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
