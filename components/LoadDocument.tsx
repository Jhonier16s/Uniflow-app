import React, { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

import { Button, Text } from "tamagui";
import { useThemeStore } from "../store/useThemeStore";

interface LoadDocumentProps {
  setFileContent: (content: string) => void;
}

const LoadDocument: React.FC<LoadDocumentProps> = ({ setFileContent }) => {
  const [fileName, setFileName] = useState<string>("");
  const { themeStyles } = useThemeStore();
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "text/calendar",
      });
      if (result.canceled) return;

      const fileUri = result.assets[0].uri;
      setFileName(result.assets[0].name);

      const fileContent = await FileSystem.readAsStringAsync(fileUri);

      setFileContent(fileContent);
    } catch (error) {
      console.error("Error picking or reading document:", error);
    }
  };
  return (
    <Button
      width={"100%"}
      fontSize="$5"
      backgroundColor={themeStyles.secondary}
      color={themeStyles.textInverted}
      onPress={pickDocument}
    >
      Subir Archivo .ICS
    </Button>
  );
};

export default LoadDocument;
