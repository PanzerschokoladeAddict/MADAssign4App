import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

interface Props {
    children: React.ReactNode;
    style?: ViewStyle
}

export default function ScreenWrapper({ children, style}: Props) {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={[styles.container, style]}>
                {children}
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: "#f5f5f5",
    },
});