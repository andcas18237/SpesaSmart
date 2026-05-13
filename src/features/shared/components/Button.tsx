import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { cn } from '../../../../lib/utils';
import { useColors } from '../../../../hooks/use-colors';

export interface ButtonProps {
  onPress?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

/**
 * Reusable Button component with multiple variants and sizes.
 * Follows Apple HIG for iOS-first design.
 */
export function Button({
  onPress,
  disabled = false,
  variant = 'primary',
  size = 'md',
  children,
  className,
}: ButtonProps) {
  const colors = useColors();

  const variantStyles = {
    primary: {
      bg: 'bg-primary',
      text: 'text-white',
    },
    secondary: {
      bg: 'bg-surface',
      text: 'text-foreground',
    },
    tertiary: {
      bg: 'bg-transparent',
      text: 'text-primary',
    },
    destructive: {
      bg: 'bg-error',
      text: 'text-white',
    },
  };

  const sizeStyles = {
    sm: 'px-3 py-2 rounded-lg',
    md: 'px-6 py-3 rounded-xl',
    lg: 'px-8 py-4 rounded-2xl',
  };

  const { bg, text } = variantStyles[variant];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        {
          opacity: disabled ? 0.5 : pressed ? 0.8 : 1,
          transform: [{ scale: pressed && !disabled ? 0.97 : 1 }],
        },
      ]}
    >
      <View
        className={cn(
          'items-center justify-center',
          bg,
          sizeStyles[size],
          disabled && 'opacity-50',
          className
        )}
      >
        <Text className={cn('font-semibold', text, 'text-base')}>
          {children}
        </Text>
      </View>
    </Pressable>
  );
}
