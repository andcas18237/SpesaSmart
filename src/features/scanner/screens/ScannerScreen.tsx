import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '../../../../components/screen-container';

/**
 * Scanner Screen - Capture receipt photos.
 * TODO: Integrate with expo-camera for actual camera functionality.
 * Currently shows placeholder UI.
 */
export default function ScannerScreen() {
  const router = useRouter();
  const [isPreview, setIsPreview] = useState(false);

  const handleCapture = () => {
    setIsPreview(true);
  };

  const handleConfirm = () => {
    // TODO: Send to OCR processing
    router.back();
  };

  const handleRetry = () => {
    setIsPreview(false);
  };

  return (
    <ScreenContainer className="p-4">
      {!isPreview ? (
        // Camera View
        <View className="flex-1 gap-4">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-4">
            <Pressable onPress={() => router.back()}>
              <Text className="text-lg text-primary font-semibold">
                Annulla
              </Text>
            </Pressable>
            <Text className="text-lg font-bold text-foreground">
              Scansiona Scontrino
            </Text>
            <View style={{ width: 60 }} />
          </View>

          {/* Camera Placeholder */}
          <View className="flex-1 bg-surface rounded-2xl border-2 border-border items-center justify-center gap-4">
            <Text className="text-4xl">📷</Text>
            <Text className="text-base text-muted text-center px-4">
              Inquadra lo scontrino all'interno del rettangolo
            </Text>
          </View>

          {/* Capture Button */}
          <Pressable
            onPress={handleCapture}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.8 : 1,
                transform: [{ scale: pressed ? 0.97 : 1 }],
              },
            ]}
          >
            <View className="bg-primary rounded-full py-4 items-center justify-center">
              <Text className="text-white font-bold text-lg">Scatta</Text>
            </View>
          </Pressable>
        </View>
      ) : (
        // Preview View
        <View className="flex-1 gap-4">
          {/* Header */}
          <View className="mb-4">
            <Text className="text-lg font-bold text-foreground">
              Anteprima
            </Text>
          </View>

          {/* Photo Placeholder */}
          <View className="flex-1 bg-surface rounded-2xl border-2 border-border items-center justify-center">
            <Text className="text-6xl">📸</Text>
          </View>

          {/* Action Buttons */}
          <View className="gap-3">
            <Pressable
              onPress={handleConfirm}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.8 : 1,
                  transform: [{ scale: pressed ? 0.97 : 1 }],
                },
              ]}
            >
              <View className="bg-primary rounded-full py-4 items-center justify-center">
                <Text className="text-white font-bold text-lg">
                  Conferma
                </Text>
              </View>
            </Pressable>

            <Pressable
              onPress={handleRetry}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <View className="bg-surface border border-border rounded-full py-4 items-center justify-center">
                <Text className="text-foreground font-bold text-lg">
                  Riprova
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      )}
    </ScreenContainer>
  );
}
