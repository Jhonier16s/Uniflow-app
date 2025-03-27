import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { Image, Paragraph, Card, Button, XStack, YStack } from "tamagui";
import useICSParser from "../../hooks/useICSParser";
import { AgendaItem } from "../../types";
import { useThemeStore } from "../../store/useThemeStore";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { SwitchModeDialog } from "../../components/SwitchModeDialog";
import List from "../../components/List";
import Calendar from "../../components/Calendar";
import { Agenda } from "../../components/Agenda";
import { useEventsStore } from "../../store/useEventsStore";

export default function EventsScreen({ navigation }: any) {
  const { themeStyles, theme } = useThemeStore();

  const [selectedMode, setSelectedMode] = useState<string>("list");
  const [items, setItems] = useState<Record<string, AgendaItem[]>>({});

  const { fileContent } = useEventsStore();
  const { events, parseICS } = useICSParser();

  useEffect(() => {
    if (fileContent) {
      parseICS(fileContent);
    }
  }, [fileContent]);

  useEffect(() => {
    if (events.length > 0) {
      console.log("Events", events);
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
    }
  }, [events]);

  return (
    <>
      <StatusBar style={theme === "light" ? "dark" : "light"} />

      <SafeAreaView style={{ flex: 1, padding: 20 }}>
        <YStack alignItems="center" gap="$2">
          <YStack alignItems="center" gap="$4" width="100%">
            <Paragraph
              fontSize="$6"
              fontWeight="700"
              color={themeStyles.primary}
              textAlign="center"
            >
              Gestiona tus eventos fácilmente
            </Paragraph>
            <Image
              source={require("../../assets/images/calendarImg.png")}
              width="100%"
              height={150}
              borderRadius={20}
              backgroundColor={themeStyles.secondary}
              objectFit="contain"
            />
          </YStack>

          <YStack alignItems="center" padding="$4" gap={"$4"}>
            <SwitchModeDialog
              setSelectedMode={setSelectedMode}
              currentMode={selectedMode}
            />
          </YStack>
          <XStack gap="$4" height={"100%"} width={"100%"}>
            {selectedMode === "agenda" && <Agenda items={items} />}
            {selectedMode === "calendar" && <Calendar items={items} />}
            {selectedMode === "list" && <List items={items} />}
          </XStack>
        </YStack>
      </SafeAreaView>
    </>
  );
}
