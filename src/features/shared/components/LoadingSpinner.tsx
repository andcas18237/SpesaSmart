import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useColors } from '../../../../hooks/use-colors';

export interface LoadingSpinnerProps {
  message?: string;
  fullScreen?: boolean;
}

/**
 * Loading spinner component with optional message.
 * Can be displayed as full-screen overlay or inline.
 */
export function LoadingSpinner({
  message = 'Caricamento...',
  fullScreen = false,
}: LoadingSpinnerProps) {
  const colors = useColors();

  const content = (
    <View className="items-center justify-center gap-3">
      <ActivityIndicator size="large" color={colors.primary} />
      {message && (
        <Text className="text-muted text-center text-base">{message}</Text>
      )}
    </View>
  );

  if (fullScreen) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        {content}
      </View>
    );
  }

  return content;
}
