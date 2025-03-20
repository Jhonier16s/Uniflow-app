import React from "react";
import { Text, View } from "tamagui";
import { Agenda as RNCAgenda } from "react-native-calendars";
import { AgendaItem } from "../types";

interface AgendaProps {
  items: Record<string, AgendaItem[]>;
}

export const Agenda: React.FC<AgendaProps> = ({ items }) => {
  return (
    <RNCAgenda
      items={items}
      renderItem={(item: AgendaItem, isFirst: boolean) => (
        <View
          style={{
            padding: 10,
            backgroundColor: "white",
            marginVertical: 5,
            borderRadius: 10,
          }}
        >
          <Text fontWeight="bold">📅 {item.name}</Text>
          <Text>
            ⏰ {item.start} - {item.end}
          </Text>
        </View>
      )}
    />
  );
};
