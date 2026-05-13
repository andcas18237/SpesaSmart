import { ScrollView, Text, View, Pressable, FlatList } from "react-native";
import { ScreenContainer } from "../../components/screen-container";
import { useColors } from "../../hooks/use-colors";

// Mock data for expenses
const mockExpenses = [
  {
    id: "1",
    date: "12 Maggio 2026",
    total: 45.50,
    itemCount: 8,
    store: "Supermercato Carrefour",
  },
  {
    id: "2",
    date: "10 Maggio 2026",
    total: 32.80,
    itemCount: 5,
    store: "Negozio Bio",
  },
  {
    id: "3",
    date: "8 Maggio 2026",
    total: 58.20,
    itemCount: 12,
    store: "Supermercato Carrefour",
  },
  {
    id: "4",
    date: "5 Maggio 2026",
    total: 28.50,
    itemCount: 4,
    store: "Mercato Centrale",
  },
];

interface Expense {
  id: string;
  date: string;
  total: number;
  itemCount: number;
  store: string;
}

function ExpenseCard({ expense, onPress }: { expense: Expense; onPress: () => void }) {
  const colors = useColors();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <View className="bg-surface rounded-2xl p-4 mb-3 border border-border">
        <View className="flex-row justify-between items-start mb-2">
          <View className="flex-1">
            <Text className="text-base font-semibold text-foreground">
              {expense.store}
            </Text>
            <Text className="text-sm text-muted mt-1">{expense.date}</Text>
          </View>
          <Text className="text-lg font-bold text-primary">
            €{expense.total.toFixed(2)}
          </Text>
        </View>
        <View className="flex-row items-center gap-2 pt-2 border-t border-border">
          <Text className="text-xs text-muted">
            {expense.itemCount} prodotti
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

export default function HomeScreen() {
  const colors = useColors();
  const totalSpent = mockExpenses.reduce((sum, exp) => sum + exp.total, 0);

  return (
    <ScreenContainer className="p-4">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="gap-6">
          {/* Header Section */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">Spesa</Text>
            <Text className="text-sm text-muted">
              Traccia le tue spese quotidiane
            </Text>
          </View>

          {/* Summary Card */}
          <View className="bg-primary rounded-2xl p-6 gap-4">
            <View>
              <Text className="text-sm text-white/80 mb-1">
                Totale speso questo mese
              </Text>
              <Text className="text-4xl font-bold text-white">
                €{totalSpent.toFixed(2)}
              </Text>
            </View>
            <View className="flex-row gap-4">
              <View className="flex-1">
                <Text className="text-xs text-white/80">Spese</Text>
                <Text className="text-xl font-bold text-white">
                  {mockExpenses.length}
                </Text>
              </View>
              <View className="flex-1">
                <Text className="text-xs text-white/80">Media</Text>
                <Text className="text-xl font-bold text-white">
                  €{(totalSpent / mockExpenses.length).toFixed(2)}
                </Text>
              </View>
            </View>
          </View>

          {/* Quick Actions */}
          <View className="flex-row gap-3">
            <Pressable
              style={({ pressed }) => [
                { flex: 1, opacity: pressed ? 0.7 : 1 },
              ]}
            >
              <View className="bg-primary rounded-xl py-3 items-center justify-center">
                <Text className="text-white font-semibold text-sm">
                  📸 Scansiona
                </Text>
              </View>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                { flex: 1, opacity: pressed ? 0.7 : 1 },
              ]}
            >
              <View className="bg-surface border border-border rounded-xl py-3 items-center justify-center">
                <Text className="text-foreground font-semibold text-sm">
                  📝 Lista
                </Text>
              </View>
            </Pressable>
          </View>

          {/* Expenses List */}
          <View className="gap-2">
            <Text className="text-lg font-bold text-foreground">
              Ultime spese
            </Text>
            <View>
              {mockExpenses.map((expense) => (
                <ExpenseCard
                  key={expense.id}
                  expense={expense}
                  onPress={() => {
                    // TODO: Navigate to expense detail
                  }}
                />
              ))}
            </View>
          </View>

          {/* Empty State Placeholder */}
          <View className="py-4 items-center">
            <Text className="text-xs text-muted">
              Inizia a scansionare i tuoi scontrini
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
