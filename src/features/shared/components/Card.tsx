import React from 'react';
import { View, Pressable, ViewProps } from 'react-native';
import { cn } from '../../../../lib/utils';

export interface CardProps extends ViewProps {
  onPress?: () => void;
  children: React.ReactNode;
  className?: string;
  pressable?: boolean;
}

/**
 * Reusable Card component for displaying content in elevated surfaces.
 * Supports optional press feedback for interactive cards.
 */
export function Card({
  onPress,
  children,
  className,
  pressable = false,
  ...props
}: CardProps) {
  const cardContent = (
    <View
      className={cn(
        'bg-surface rounded-2xl p-4 border border-border',
        'shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </View>
  );

  if (pressable || onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.7 : 1,
          },
        ]}
      >
        {cardContent}
      </Pressable>
    );
  }

  return cardContent;
}
