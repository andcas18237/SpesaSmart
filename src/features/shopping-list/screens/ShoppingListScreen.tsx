import React, { useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { ScreenContainer } from '../../../../components/screen-container';
import { Card, EmptyState } from '../../shared/components';

/**
 * Shopping List Screen - Create and manage shopping lists.
 * TODO: Implement list creation logic and persistence.
 * Currently shows placeholder UI.
 */
export default function ShoppingListScreen() {
  const [showOptions, setShowOptions] = useState(true);

  const handleCreateFromLastExpense = () => {
    // TODO: Load last expense and create list
    setShowOptions(false);
  };

  const handleCreateFromFrequent = () => {
    // TODO: Load most frequent products and create list
    setShowOptions(false);
  };

  if (showOptions) {
    return (
      <ScreenContainer className="p-4">
        {/* Header */}
        <View className="mb-8">
          <Text className="text-3xl font-bold text-foreground">
            Nuova Lista
          </Text>
          <Text className="text-sm text-muted mt-1">
            Scegli come creare la tua lista della spesa
          </Text>
        </View>

        {/* Options */}
        <View className="gap-4">
          {/* Option 1: Last Expense */}
          <Pressable
            onPress={handleCreateFromLastExpense}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <Card className="p-6">
              <View className="gap-2">
                <Text className="text-2xl">📋</Text>
                <Text className="text-lg font-bold text-foreground">
                  Basata su Ultima Spesa
                </Text>
                <Text className="text-sm text-muted">
                  Copia i prodotti dall'ultima spesa effettuata
                </Text>
              </View>
            </Card>
          </Pressable>

          {/* Option 2: Frequent Products */}
          <Pressable
            onPress={handleCreateFromFrequent}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <Card className="p-6">
              <View className="gap-2">
                <Text className="text-2xl">⭐</Text>
                <Text className="text-lg font-bold text-foreground">
                  Basata su Prodotti Frequenti
                </Text>
                <Text className="text-sm text-muted">
                  Suggerimenti dai tuoi acquisti più comuni
                </Text>
              </View>
            </Card>
          </Pressable>
        </View>
      </ScreenContainer>
    );
  }

  // TODO: Implement actual shopping list view with items
  return (
    <ScreenContainer className="p-4">
      <View className="mb-6">
        <Text className="text-3xl font-bold text-foreground">
          Lista della Spesa
        </Text>
      </View>

      <EmptyState
        title="Lista vuota"
        message="Aggiungi articoli alla tua lista"
      />
    </ScreenContainer>
  );
}
