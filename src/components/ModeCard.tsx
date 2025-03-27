import { Card, Text, View } from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import { useThemeStore } from "../store/useThemeStore";

interface ModeCardProps {
  mode: { key: string; label: string };
  selected: boolean;
  onSelect: () => void;
}

export function ModeCard({ mode, selected, onSelect }: ModeCardProps) {
  const { themeStyles } = useThemeStore();

  return (
    <Card
      bordered
      elevate
      padding="$4"
      backgroundColor={selected ? themeStyles.primary : "$background"}
      onPress={onSelect}
      width={110}
      alignItems="center"
      justifyContent="center"
    >
      <Ionicons
        outline
        name={
          mode.key === "list"
            ? "list-outline"
            : mode.key === "calendar"
            ? "calendar-outline"
            : "time-outline"
        }
        size={22}
        color={selected ? themeStyles.textInverted : themeStyles.text}
      />
      <Text
        fontSize="$4"
        fontWeight="600"
        marginTop="$3"
        color={selected ? themeStyles.textInverted : themeStyles.text}
      >
        {mode.label}
      </Text>
    </Card>
  );
}
