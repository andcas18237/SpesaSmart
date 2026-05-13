import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { ScreenContainer } from '../../../../components/screen-container';
import { Card } from '../../shared/components';

/**
 * Settings Screen - App configuration and preferences.
 * TODO: Implement theme toggle, language selection, data management.
 * Currently shows placeholder UI.
 */
export default function SettingsScreen() {
  return (
    <ScreenContainer className="p-4">
      {/* Header */}
      <View className="mb-6">
        <Text className="text-3xl font-bold text-foreground">
          Impostazioni
        </Text>
        <Text className="text-sm text-muted mt-1">
          Personalizza l'app
        </Text>
      </View>

      {/* Settings Sections */}
      <View className="gap-4">
        {/* Appearance */}
        <Card>
          <View className="gap-3">
            <Text className="text-lg font-bold text-foreground">
              Aspetto
            </Text>
            <Pressable
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <View className="py-3 flex-row justify-between items-center">
                <Text className="text-base text-foreground">Tema</Text>
                <Text className="text-sm text-muted">Auto</Text>
              </View>
            </Pressable>
          </View>
        </Card>

        {/* Language */}
        <Card>
          <View className="gap-3">
            <Text className="text-lg font-bold text-foreground">
              Lingua
            </Text>
            <Pressable
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <View className="py-3 flex-row justify-between items-center">
                <Text className="text-base text-foreground">Lingua</Text>
                <Text className="text-sm text-muted">Italiano</Text>
              </View>
            </Pressable>
          </View>
        </Card>

        {/* Data Management */}
        <Card>
          <View className="gap-3">
            <Text className="text-lg font-bold text-foreground">
              Dati
            </Text>
            <Pressable
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <View className="py-3 border-b border-border">
                <Text className="text-base text-foreground">
                  Esporta dati
                </Text>
              </View>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <View className="py-3">
                <Text className="text-base text-error">Cancella tutto</Text>
              </View>
            </Pressable>
          </View>
        </Card>

        {/* About */}
        <Card>
          <View className="gap-3">
            <Text className="text-lg font-bold text-foreground">
              Informazioni
            </Text>
            <View className="py-3 flex-row justify-between items-center">
              <Text className="text-base text-foreground">Versione</Text>
              <Text className="text-sm text-muted">1.0.0</Text>
            </View>
          </View>
        </Card>
      </View>
    </ScreenContainer>
  );
}
