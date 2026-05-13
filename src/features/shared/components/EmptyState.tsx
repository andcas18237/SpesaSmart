import React from 'react';
import { View, Text } from 'react-native';

export interface EmptyStateProps {
  title: string;
  message: string;
  icon?: React.ReactNode;
}

/**
 * Empty state component for displaying when no data is available.
 */
export function EmptyState({ title, message, icon }: EmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center p-6 gap-4">
      {icon && <View className="text-4xl">{icon}</View>}
      <Text className="text-2xl font-bold text-foreground text-center">
        {title}
      </Text>
      <Text className="text-base text-muted text-center">{message}</Text>
    </View>
  );
}
