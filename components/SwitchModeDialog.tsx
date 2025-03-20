import { Adapt, Button, Dialog, Sheet, View, XStack } from "tamagui";
import { useEffect, useState } from "react";
import { useThemeStore } from "../store/useThemeStore";

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

      <Adapt when="sm" platform="touch">
        <Sheet animation="medium" zIndex={200000} modal dismissOnSnapToBottom>
          <Sheet.Frame padding="$4" gap="$4">
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay
            backgroundColor="$shadow6"
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          backgroundColor="$shadow6"
          animation="slow"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Dialog.Content
          bordered
          elevate
          key="content"
          animateOnly={["transform", "opacity"]}
          animation={["quicker", { opacity: { overshootClamping: true } }]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap="$4"
        >
          <Dialog.Title>Seleccionar Modo</Dialog.Title>
          <Dialog.Description>
            Elige el modo de visualización del calendario.
          </Dialog.Description>

          <View gap="$3">
            {modes.map((mode) => (
              <Button
                key={mode.key}
                onPress={() => {
                  setSelectedMode(mode.key);
                  setLocalMode(mode.key);
                  //setOpen(false);
                }}
                backgroundColor={
                  localMode === mode.key ? themeStyles.primary : "transparent"
                }
                color={
                  localMode === mode.key
                    ? themeStyles.textInverted
                    : themeStyles.text
                }
              >
                {mode.label}
              </Button>
            ))}
          </View>

          <XStack gap="$3" justifyContent="flex-end">
            <Button
              onPress={() => {
                setOpen(false);
              }}
              backgroundColor={themeStyles.primary}
              color={themeStyles.textInverted}
            >
              Guardar
            </Button>
          </XStack>

          <Dialog.Close asChild>
            <Button
              position="absolute"
              top="$3"
              right="$3"
              size="$2"
              circular
            />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
