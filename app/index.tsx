import { loginAnonymously } from "@/services/authServices";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SetUp() {
  const router = useRouter();

  useEffect(() => {
    loginAnonymously(); // Silenty log in the user anonymously to enable backend interactions without requiring immediate authentication.
  }, []);

  const handleComplete = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push("/teams/setup");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Onboarding
        onSkip={handleComplete}
        onDone={handleComplete}
        pages={[
          {
            backgroundColor: "#4c8f3f",
            image: <Image source={require("../assets/images/welcome.png")} />,
            title: "Welcome to STEMM Lab",
            subtitle:
              "A hands-on science challenge app for curious minds. Compete, explore, and discover!",
          },
          {
            backgroundColor: "#3a7bd5",
            image: <Image source={require("../assets/images/welcome.png")} />,
            title: "Team Challenges",
            subtitle:
              "Work together as a team to complete science and engineering activities.",
          },
          {
            backgroundColor: "#e8a838",
            image: <Image source={require("../assets/images/welcome.png")} />,
            title: "Record Your Results",
            subtitle:
              "Capture videos, log your data, and compare your results against other teams on the leaderboard.",
          },
          {
            backgroundColor: "#9b59b6",
            image: <Image source={require("../assets/images/welcome.png")} />,
            title: "Ready to Begin?",
            subtitle:
              "Create a new team or join an existing one to start your STEMM Lab adventure!",
          },
        ]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
