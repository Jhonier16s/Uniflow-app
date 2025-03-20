import React from "react";
import { Text, View } from "tamagui";
import { Agenda as RNCAgenda } from "react-native-calendars";
import { AgendaItem } from "../types";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
            padding: 12,
            backgroundColor: "#fff",
            marginVertical: 8,
            borderRadius: 12,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <Text fontWeight="bold" fontSize={16} color="#333">
            📅 {item.name}
          </Text>
          <Text fontSize={14} color="#666">
            <MaterialCommunityIcons
              name="clock-outline"
              size={20}
              color="#666"
            />{" "}
            {item.start} - {item.end}
          </Text>
        </View>
      )}
      theme={{
        selectedDayBackgroundColor: "#007AFF",
        todayTextColor: "#007AFF",
        agendaTodayColor: "#007AFF",
        dotColor: "#007AFF",
      }}
    />
  );
};
