import React, { useState } from "react";
import { Card, Paragraph, ScrollView, Text, View, XStack, YStack } from "tamagui";
import { Agenda as RNCAgenda } from "react-native-calendars";
import { AgendaItem } from "../types";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useThemeStore } from "../store/useThemeStore";

interface AgendaProps {
  items: Record<string, AgendaItem[]>;
}

export const Agenda: React.FC<AgendaProps> = ({ items }) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const { themeStyles } = useThemeStore();

  return (
    <View style={{ flex: 1, backgroundColor: "#F8F9FA" }}>
      <RNCAgenda
        items={items}
        onDayPress={(day: any) => setSelectedDate(day.dateString)}
        renderItem={(item: AgendaItem) => (
          <Card
            bordered
            padding="$4"
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
              marginBottom: 10,
              marginTop: 20,
            }}
          >
            <YStack gap="$2">
              <XStack alignItems="center" gap={10}>
                <MaterialCommunityIcons
                  name="calendar-check"
                  size={22}
                  color={themeStyles.primary}
                />
                <Text fontWeight="bold" fontSize={16}>
                  {item.name}
                </Text>
              </XStack>
              <XStack alignItems="center" gap={8}>
                <Ionicons
                  name="book-outline"
                  size={20}
                  color={themeStyles.primary}
                />
                <Paragraph size="$4" fontWeight="600">
                  Materia: {/* {item.subject} */} Programacion
                </Paragraph>
              </XStack>
              <XStack alignItems="center" gap={8}>
                <Ionicons
                  name="time-outline"
                  size={22}
                  color={themeStyles.primary}
                />
                <Paragraph size={"$4"} color={themeStyles.text}>
                  {item.start} - {item.end}
                </Paragraph>
              </XStack>
            </YStack>
          </Card>
        )}
        theme={{
          selectedDayBackgroundColor: "#007AFF",
          todayTextColor: "#007AFF",
          agendaTodayColor: "#007AFF",
          dotColor: "#007AFF",
        }}
      />
    </View>
  );
};
