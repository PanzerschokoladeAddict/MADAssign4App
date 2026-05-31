import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function CodeJoin() {
    const [code, setCode] = useState("");
    const router = useRouter();
    
    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <Text>
                    Enter Team Code
                </Text>
                <TextInput
                    label="Team Code"
                    value={code}
                    onChangeText={setCode}
                >

                </TextInput>
                <Button
                    onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                        router.push({pathname: "./joined", params: { teamCode: code } });
                    }}
                >
                    Join Team
                </Button>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}