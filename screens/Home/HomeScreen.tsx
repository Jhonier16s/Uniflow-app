import React from "react";
import { ScrollView } from "react-native";
import { Card, Paragraph, XStack, YStack, Progress, Text } from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import { useThemeStore } from "../../store/useThemeStore";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const { themeStyles, theme } = useThemeStore();

  const weeklyStats = {
    completed: 5,
    inProgress: 3,
    pending: 2,
    total: 10,
    subjects: 4,
    totalHours: 15,
  };

  return (
    <>
      <StatusBar style={theme === "light" ? "dark" : "light"} />
      <SafeAreaView style={{ flex: 1, padding: 20 }}>
        <YStack gap="$5">
          {/* Resumen de la semana */}
          <Card
            bordered
            padding="$4"
            backgroundColor="#F9FAFB"
            borderRadius={12}
          >
            <YStack>
              <Text fontSize="$6" fontWeight="700" color={themeStyles.primary}>
                Resumen de la semana
              </Text>
              <XStack alignItems="center" gap={10} marginTop={10}>
                <Ionicons name="checkmark-circle" size={22} color="green" />
                <Text fontSize="$4">Completados: {weeklyStats.completed}</Text>
              </XStack>
              <XStack alignItems="center" gap={10} marginTop={5}>
                <Ionicons name="time" size={22} color="orange" />
                <Text fontSize="$4">En progreso: {weeklyStats.inProgress}</Text>
              </XStack>
              <XStack alignItems="center" gap={10} marginTop={5}>
                <Ionicons name="alert-circle" size={22} color="red" />
                <Text fontSize="$4">Pendientes: {weeklyStats.pending}</Text>
              </XStack>
            </YStack>
          </Card>

          {/* Barra de progreso */}
          <Card
            bordered
            padding="$4"
            backgroundColor="#F9FAFB"
            borderRadius={12}
            gap={16}
          >
            <Text fontSize="$6" fontWeight="700" color={themeStyles.primary}>
              Progreso de la semana
            </Text>
            <Progress value={(weeklyStats.completed / weeklyStats.total) * 100}>
              <Progress.Indicator
                animation="bouncy"
                backgroundColor={themeStyles.primary}
              />
            </Progress>

            <Text fontSize="$4" alignSelf="center">
              {weeklyStats.completed} de {weeklyStats.total} eventos completados
            </Text>
          </Card>

          {/* Estadísticas rápidas */}
          <Card
            bordered
            padding="$4"
            backgroundColor="#F9FAFB"
            borderRadius={12}
          >
            <Text fontSize="$6" fontWeight="700" color={themeStyles.primary}>
              Estadísticas rápidas
            </Text>
            <XStack justifyContent="space-between" marginTop={10}>
              <YStack alignItems="center">
                <Ionicons
                  name="book-outline"
                  size={22}
                  color={themeStyles.primary}
                />
                <Text fontSize="$4">Materias: {weeklyStats.subjects}</Text>
              </YStack>
              <YStack alignItems="center">
                <Ionicons
                  name="calendar-outline"
                  size={22}
                  color={themeStyles.primary}
                />
                <Text fontSize="$4">Eventos: {weeklyStats.total}</Text>
              </YStack>
              <YStack alignItems="center">
                <Ionicons
                  name="time-outline"
                  size={22}
                  color={themeStyles.primary}
                />
                <Text fontSize="$4">Horas: {weeklyStats.totalHours}</Text>
              </YStack>
            </XStack>
          </Card>
        </YStack>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
