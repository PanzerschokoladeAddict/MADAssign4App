import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function CodeJoin() {
    const [code, setCode] = useState("");
    const router = useRouter();
    
    const handlePress = ( route: any ) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        router.push({pathname: route, params: { teamCode: code } });
    };

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
                        handlePress("./joined")
                    }}
                >
                    Join Team
                </Button>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}