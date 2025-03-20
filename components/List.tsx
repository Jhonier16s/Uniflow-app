import React from "react";
import { ScrollView } from "react-native";
import { Card, Paragraph, XStack, YStack } from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import { AgendaItems } from "../types";

const List = ({ items }: { items: AgendaItems }) => {
  const eventsArray = Object.keys(items)
    .sort()
    .flatMap((date) => items[date].map((event) => ({ ...event, date })));

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <YStack gap="$4">
        {eventsArray.map((item, index) => (
          <Card key={`${item.date}-${index}`} elevate bordered padding="$4">
            <YStack gap="$2">
              <XStack alignItems="center" space="$2">
                <Ionicons name="calendar-outline" size={18} />
                <Paragraph fontWeight="700">{item.date}</Paragraph>
              </XStack>
              <Paragraph size="$4" fontWeight="600">
                {item.name}
              </Paragraph>
              <Paragraph size="$3" color="gray">
                🕒 {item.start} - {item.end}
              </Paragraph>
            </YStack>
          </Card>
        ))}
      </YStack>
    </ScrollView>
  );
};

export default List;

