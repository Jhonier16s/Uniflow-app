import { Dialog, View, Button, XStack } from "tamagui";
import { useState } from "react";
import { useThemeStore } from "../store/useThemeStore";
import { MaterialIcons } from "@expo/vector-icons";
import { ModeCard } from "./ModeCard";

interface SwitchModeDialogProps {
  setSelectedMode: (mode: string) => void;
  currentMode: string;
}

const modes = [
  { key: "list", label: "Lista" },
  { key: "calendar", label: "Calendario" },
  { key: "agenda", label: "Agenda" },
];

export function SwitchModeDialog({
  setSelectedMode,
  currentMode,
}: SwitchModeDialogProps) {
  const { themeStyles } = useThemeStore();
  const [open, setOpen] = useState<boolean>(false);
  const [localMode, setLocalMode] = useState<string>(currentMode);

  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button
          backgroundColor={themeStyles.primary}
          color={themeStyles.textInverted}
          fontSize="$5"
        >
          Cambiar modo
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          backgroundColor="rgba(0, 0, 0, 0.5)"
          animation="slow"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
          onPress={() => setOpen(false)}
        />

        <Dialog.Content
          bordered
          elevate
          key="content"
          animateOnly={["transform", "opacity"]}
          animation={["quicker", { opacity: { overshootClamping: true } }]}
          enterStyle={{ opacity: 0, scale: 0.9 }}
          exitStyle={{ opacity: 0, scale: 0.95 }}
          gap="$4"
        >
          <Dialog.Close asChild>
            <Button
              position="absolute"
              top="$3"
              right="$3"
              size="$2"
              circular
              backgroundColor="transparent"
              icon={
                <MaterialIcons
                  name="close"
                  size={24}
                  color={themeStyles.text}
                />
              }
            />
          </Dialog.Close>

          <Dialog.Title
            color={themeStyles.primary}
            fontSize="$8"
            fontWeight="600"
            textAlign="center"
          >
            Seleccionar Modo
          </Dialog.Title>
          <Dialog.Description>
            Elige el modo de visualización del calendario.
          </Dialog.Description>

          <XStack justifyContent="center" gap="$3" maxWidth="365">
            {modes.map((mode) => (
              <ModeCard
                key={mode.key}
                mode={mode}
                selected={localMode === mode.key}
                onSelect={() => {
                  setSelectedMode(mode.key);
                  setLocalMode(mode.key);
                  setOpen(false);
                }}
              />
            ))}
          </XStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
