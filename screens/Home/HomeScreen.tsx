import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import { Text } from "tamagui";
import { Agenda } from "react-native-calendars";

import LoadDocument from "../../components/LoadDocument";
import useICSParser from "../../hooks/useICSParser";
import EventsContainer from "../../components/EventsContainer";
import { AgendaItem } from "../../types";

export default function HomeScreen() {
  const { events, parseICS } = useICSParser();
  const [fileContent, setFileContent] = useState<string>("");
  const [items, setItems] = useState<Record<string, AgendaItem[]>>({});

  useEffect(() => {
    if (fileContent) {
      parseICS(fileContent);
    }
  }, [fileContent]);

  useEffect(() => {
    const newItems: Record<string, any> = {};
    events.forEach((event) => {
      const date = event.start.split("T")[0];
      if (!newItems[date]) newItems[date] = [];
      newItems[date].push({
        name: event.summary,
        start: event.start.split("T")[1],
        end: event.end.split("T")[1],
      });
    });
    setItems(newItems);
  }, [events]);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <LoadDocument setFileContent={setFileContent} />
      <EventsContainer items={items} />
    </View>
  );
}
