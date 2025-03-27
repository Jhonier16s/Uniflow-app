import React from "react";
import { Card, Paragraph, Text, XStack } from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useThemeStore } from "../../store/useThemeStore";
import {LoadDocument} from "../../components/LoadDocument";

export default function SettingsScreen() {
  const { themeStyles, theme } = useThemeStore();
  return (
    <>
      <StatusBar style={theme === "light" ? "dark" : "light"} />
      <SafeAreaView style={{ flex: 1, padding: 20 }}>
        <Card elevate bordered padding="$6" width="100%" gap="$3">
          <Paragraph size="$4" color={themeStyles.text} textAlign="center">
            Carga un archivo .ICS para visualizar tus eventos en el calendario.
          </Paragraph>
          <XStack justifyContent="center">
            <LoadDocument  />
          </XStack>
        </Card>

       {/*  <Card elevate bordered padding="$6" width="100%" gap="$3">
          <XStack alignItems="center" justifyContent="center" space="$2">
            <Ionicons
              name="calendar-outline"
              size={20}
              color={themeStyles.primary}
            />
            <Paragraph size="$4" fontWeight="600" color={themeStyles.primary}>
              Modo de visualización: {selectedMode}
            </Paragraph>
          </XStack>
          <SwitchModeDialog
            setSelectedMode={setSelectedMode}
            currentMode={selectedMode}
          />
        </Card> */}


      </SafeAreaView>
    </>
  );
}
