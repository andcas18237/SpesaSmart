import React, { useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenContainer } from '../../../../components/screen-container';
import { Card, EmptyState } from '../../shared/components';
import { Expense } from '../../shared/types';

/**
 * Home Screen - Displays expense history.
 * Shows all expenses with total cost per expense.
 * Allows user to tap on an expense to see details.
 */
export default function HomeScreen() {
  const router = useRouter();

  // TODO: Replace with real data from AsyncStorage/API
  const [expenses] = useState<Expense[]>([
    {
      id: '1',
      date: new Date(2026, 4, 12),
      products: [
        { id: '1', name: 'Pane', price: 2.5 },
        { id: '2', name: 'Latte', price: 1.2 },
        { id: '3', name: 'Burro', price: 3.0 },
      ],
      total: 6.7,
      createdAt: new Date(2026, 4, 12),
      updatedAt: new Date(2026, 4, 12),
    },
    {
      id: '2',
      date: new Date(2026, 4, 11),
      products: [
        { id: '4', name: 'Pomodori', price: 2.0 },
        { id: '5', name: 'Insalata', price: 1.5 },
        { id: '6', name: 'Olio', price: 5.0 },
      ],
      total: 8.5,
      createdAt: new Date(2026, 4, 11),
      updatedAt: new Date(2026, 4, 11),
    },
  ]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('it-IT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  const handleExpensePress = (expense: Expense) => {
    // TODO: Navigate to expense detail
    console.log('Navigate to expense detail:', expense.id);
  };

  const renderExpenseCard = ({ item }: { item: Expense }) => (
    <Card
      onPress={() => handleExpensePress(item)}
      pressable
      className="mb-3"
    >
      <View className="gap-2">
        <View className="flex-row justify-between items-start">
          <View className="flex-1">
            <Text className="text-sm text-muted">
              {formatDate(item.date)}
            </Text>
            <Text className="text-xs text-muted mt-1">
              {item.products.length} articoli
            </Text>
          </View>
          <Text className="text-2xl font-bold text-primary">
            €{item.total.toFixed(2)}
          </Text>
        </View>
      </View>
    </Card>
  );

  return (
    <ScreenContainer className="p-4">
      {/* Header */}
      <View className="mb-6">
        <Text className="text-3xl font-bold text-foreground">
          Le mie Spese
        </Text>
        <Text className="text-sm text-muted mt-1">
          Cronologia delle tue spese
        </Text>
      </View>

      {/* Expenses List */}
      {expenses.length > 0 ? (
        <FlatList
          data={expenses}
          renderItem={renderExpenseCard}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      ) : (
        <EmptyState
          title="Nessuna spesa"
          message="Scansiona il tuo primo scontrino per iniziare"
        />
      )}

      {/* Floating Action Button - Scanner */}
      <Pressable
        onPress={() => router.push('/scanner')}
        style={({ pressed }) => [
          {
            position: 'absolute',
            bottom: 80,
            right: 20,
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: '#10B981',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: pressed ? 0.8 : 1,
            transform: [{ scale: pressed ? 0.95 : 1 }],
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          },
        ]}
      >
        <Text className="text-2xl text-white">+</Text>
      </Pressable>
    </ScreenContainer>
  );
}
