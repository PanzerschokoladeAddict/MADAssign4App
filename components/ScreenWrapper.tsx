import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

interface ScreenWrapperProps {
  children: React.ReactNode;
  style?: ViewStyle;
  /**
   * Add extra horizontal padding (default: 20)
   */
  paddingHorizontal?: number;
}

/**
 * Reusable screen wrapper that handles SafeAreaProvider + SafeAreaView
 * with consistent default padding.
 *
 * Usage:
 *   import ScreenWrapper from '@/components/ScreenWrapper';
 *
 *   <ScreenWrapper>
 *     <Text>Hello</Text>
 *   </ScreenWrapper>
 */
export default function ScreenWrapper({
  children,
  style,
  paddingHorizontal = 20,
}: ScreenWrapperProps) {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[
          styles.container,
          { paddingHorizontal },
          style,
        ]}
      >
        {children}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
