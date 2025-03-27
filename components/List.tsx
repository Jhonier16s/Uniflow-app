import React from "react";
import { ScrollView } from "react-native";
import { Card, Paragraph, XStack, YStack } from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import { AgendaItems } from "../types";
import { useThemeStore } from "../store/useThemeStore";

const List = ({ items }: { items: AgendaItems }) => {
  const { themeStyles } = useThemeStore();
  const eventsArray = Object.keys(items)
    .sort()
    .flatMap((date) => items[date].map((event) => ({ ...event, date })));

  return (
    <ScrollView contentContainerStyle={{ padding: 10 }}>
      <YStack gap="$4">
        {eventsArray.map((item, index) => (
          <Card
            key={`${item.date}-${index}`}
            bordered
            padding="$4"
            style={{
              boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
              borderRadius: 12,
              backgroundColor: "#F9FAFB",
            }}
          >
            <YStack gap="$3">
              <XStack alignItems="center" gap={8}>
                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color={themeStyles.primary}
                />
                <Paragraph fontWeight="700" color={themeStyles.primary}>
                  {item.date}
                </Paragraph>
              </XStack>
              <Paragraph size="$5" fontWeight="700">
                {item.name}
              </Paragraph>
              <XStack alignItems="center" gap={8}>
                <Ionicons
                  name="book-outline"
                  size={18}
                  color={themeStyles.primary}
                />
                <Paragraph size="$4" fontWeight="600">
                  Materia: {/* {item.subject} */} Programacion 
                </Paragraph>
              </XStack>
              <XStack alignItems="center" gap={8}>
                <Ionicons
                  name="time-outline"
                  size={18}
                  color={themeStyles.primary}
                />
                <Paragraph size="$4" color={themeStyles.text}>
                {item.start} - {item.end}
                </Paragraph>
              </XStack>
            </YStack>
          </Card>
        ))}
      </YStack>
    </ScrollView>
  );
};

export default List;
