import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import { Image, Paragraph, Card, Button, XStack, YStack } from "tamagui";
import { Agenda } from "react-native-calendars";

import LoadDocument from "../../components/LoadDocument";
import useICSParser from "../../hooks/useICSParser";
import EventsContainer from "../../components/EventsContainer";
import { AgendaItem } from "../../types";
import { useThemeStore } from "../../store/useThemeStore";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EventsScreen() {
  const { themeStyles, theme } = useThemeStore();

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
    <>
      <StatusBar style={theme === "light" ? "dark" : "light"} />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
          <YStack alignItems="center" space="$4">
            <Paragraph
              size="$5"
              fontWeight="700"
              color={themeStyles.primary}
              textAlign="center"
            >
              Gestiona tus eventos fácilmente
            </Paragraph>
            <Image
              source={require("../../assets/images/calendarImg.png")}
              width="90%"
              height={250}
              borderRadius={20}
              backgroundColor={themeStyles.secondary}
              resizeMode="contain"
              marginBottom={20}
            />

            <Card elevate bordered padding="$4" width="100%" space="$3">
              <Paragraph size="$3" color={themeStyles.text} textAlign="center">
                Carga un archivo .ICS para visualizar tus eventos en el
                calendario.
              </Paragraph>
              <XStack justifyContent="center">
                <LoadDocument setFileContent={setFileContent} />
              </XStack>
            </Card>

            {events.length > 0 && (
              <Card elevate bordered padding="$4" width="100%">
                <Paragraph size="$3" fontWeight="600" color="$green10">
                  📆 Eventos cargados:
                </Paragraph>
                <EventsContainer items={items} />
              </Card>
            )}
          </YStack>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
