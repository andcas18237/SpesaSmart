import React from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ScreenContainer } from '../../../../components/screen-container';

/**
 * Expense Detail Screen - Shows products from a single expense.
 * TODO: Load expense data from AsyncStorage/API based on expenseId param.
 * Currently shows placeholder data.
 */
export default function ExpenseDetailScreen() {
  const router = useRouter();
  const { expenseId } = useLocalSearchParams();

  // TODO: Replace with real data fetched by expenseId
  const mockExpense = {
    id: expenseId || '1',
    date: new Date(2026, 4, 12),
    products: [
      { id: '1', name: 'Pane', price: 2.5, quantity: 1 },
      { id: '2', name: 'Latte', price: 1.2, quantity: 2 },
      { id: '3', name: 'Burro', price: 3.0, quantity: 1 },
    ],
    total: 6.7,
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('it-IT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  const renderProduct = ({ item }: any) => (
    <Pressable
      onPress={() => {
        // TODO: Navigate to edit product
      }}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <View className="border-b border-border py-4 flex-row justify-between items-center">
        <View className="flex-1">
          <Text className="text-base font-semibold text-foreground">
            {item.name}
          </Text>
          {item.quantity && (
            <Text className="text-sm text-muted mt-1">
              Quantità: {item.quantity}
            </Text>
          )}
        </View>
        <Text className="text-base font-bold text-primary">
          €{(item.price * (item.quantity || 1)).toFixed(2)}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <ScreenContainer className="p-4">
      {/* Header */}
      <View className="flex-row items-center mb-6">
        <Pressable onPress={() => router.back()}>
          <Text className="text-lg text-primary font-semibold">← Indietro</Text>
        </Pressable>
      </View>

      {/* Expense Info */}
      <View className="mb-6 pb-4 border-b border-border">
        <Text className="text-sm text-muted">
          {formatDate(mockExpense.date)}
        </Text>
        <Text className="text-2xl font-bold text-foreground mt-2">
          Spesa del {formatDate(mockExpense.date).split(' ')[0]}
        </Text>
        <Text className="text-sm text-muted mt-1">
          {mockExpense.products.length} articoli
        </Text>
      </View>

      {/* Products List */}
      <FlatList
        data={mockExpense.products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={{ flexGrow: 1 }}
      />

      {/* Total Section */}
      <View className="mt-6 pt-4 border-t-2 border-primary gap-3">
        <View className="flex-row justify-between items-center">
          <Text className="text-base text-muted">Subtotale</Text>
          <Text className="text-base font-semibold text-foreground">
            €{mockExpense.total.toFixed(2)}
          </Text>
        </View>
        <View className="flex-row justify-between items-center">
          <Text className="text-2xl font-bold text-foreground">Totale</Text>
          <Text className="text-3xl font-bold text-primary">
            €{mockExpense.total.toFixed(2)}
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="gap-3 mt-6">
        <Pressable
          onPress={() => {
            // TODO: Create shopping list from this expense
          }}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.8 : 1,
              transform: [{ scale: pressed ? 0.97 : 1 }],
            },
          ]}
        >
          <View className="bg-primary rounded-full py-3 items-center justify-center">
            <Text className="text-white font-bold text-base">
              Crea Lista
            </Text>
          </View>
        </Pressable>

        <Pressable
          onPress={() => {
            // TODO: Delete expense with confirmation
          }}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.8 : 1,
            },
          ]}
        >
          <View className="bg-error rounded-full py-3 items-center justify-center">
            <Text className="text-white font-bold text-base">Elimina</Text>
          </View>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}
