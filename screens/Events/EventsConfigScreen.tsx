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
import { SwitchModeDialog } from "../../components/SwitchModeDialog";
import { Ionicons } from "@expo/vector-icons";

export default function EventsConfigScreen({ navigation }: any) {
  const { themeStyles, theme } = useThemeStore();

  const [selectedMode, setSelectedMode] = useState<string>("list");
  const { events, parseICS } = useICSParser();
  const [fileContent, setFileContent] = useState<string>("");
  const [items, setItems] = useState<Record<string, AgendaItem[]>>({});

  useEffect(() => {
    if (fileContent) {
      parseICS(fileContent);
    }
  }, [fileContent]);

  useEffect(() => {
    if (events.length > 0) {
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
      navigation.navigate("EventsView", { items: newItems });
    } else {
      navigation.navigate("Events");
    }
  }, [events]);

  return (
    <>
      <StatusBar style={theme === "light" ? "dark" : "light"} />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
          <YStack alignItems="center" padding="$4" gap="$8">
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
              width="90%"
              height={250}
              borderRadius={20}
              backgroundColor={themeStyles.secondary}
              objectFit="contain"
            />

            <Card elevate bordered padding="$6" width="100%" gap="$3">
              <Paragraph size="$4" color={themeStyles.text} textAlign="center">
                Carga un archivo .ICS para visualizar tus eventos en el
                calendario.
              </Paragraph>
              <XStack justifyContent="center">
                <LoadDocument setFileContent={setFileContent} />
              </XStack>
            </Card>

            <Card elevate bordered padding="$6" width="100%" gap="$3">
              <XStack alignItems="center" justifyContent="center" space="$2">
                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color={themeStyles.primary}
                />
                <Paragraph
                  size="$4"
                  fontWeight="600"
                  color={themeStyles.primary}
                >
                  Modo de visualización: {selectedMode}
                </Paragraph>
              </XStack>
              <SwitchModeDialog
                setSelectedMode={setSelectedMode}
                currentMode={selectedMode}
              />
            </Card>
          </YStack>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
