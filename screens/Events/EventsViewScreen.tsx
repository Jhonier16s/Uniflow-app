import React, { useState } from "react";
import { View } from "react-native";
import { Paragraph, ScrollView, YStack } from "tamagui";
import { SwitchModeDialog } from "../../components/SwitchModeDialog";
import { Agenda } from "../../components/Agenda";
import Calendar from "../../components/Calendar";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeStore } from "../../store/useThemeStore";
import List from "../../components/List";

const EventsViewScreen = ({ route }: any) => {
  const { theme } = useThemeStore();
  const { items } = route.params || {};
  const [selectedMode, setSelectedMode] = useState<string>("list");
  return (
    <>
      <StatusBar style={theme === "light" ? "dark" : "light"} />
      <SafeAreaView style={{ flex: 1 }}>
        <YStack alignItems="center" padding="$4" gap="$8">
          <Paragraph fontSize="$6" fontWeight="700" textAlign="center">
            Vista de Eventos
          </Paragraph>

          <SwitchModeDialog
            setSelectedMode={setSelectedMode}
            currentMode={selectedMode}
          />
        </YStack>
        {selectedMode === "agenda" && <Agenda items={items} />}
        {selectedMode === "calendar" && <Calendar items={items} />}
        {selectedMode === "list" && <List items={items} />}
      </SafeAreaView>
    </>
  );
};

export default EventsViewScreen;
