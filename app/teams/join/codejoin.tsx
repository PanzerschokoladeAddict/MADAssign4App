import ScreenWrapper from "@/components/ScreenWrapper";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text } from "react-native";
import { Button, TextInput } from "react-native-paper";

export default function CodeJoin() {
    const [code, setCode] = useState("");
    const router = useRouter();
    
    const handlePress = ( route: any ) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        router.push({pathname: route, params: { teamCode: code } });
    };

    return (
        <ScreenWrapper>
            <Text>
                Enter Team Code
            </Text>
            <TextInput
                label="Team Code"
                value={code}
                onChangeText={setCode}
            />
            <Button
                onPress={() => {
                    handlePress("./joined")
                }}
            >
                Join Team
            </Button>
        </ScreenWrapper>
    )
}