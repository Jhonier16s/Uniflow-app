import { Input, Text, XStack, YStack } from "tamagui";

interface CustomInputProps {
  error?: string;
  onChangeText?: (text: string) => void;
  [key: string]: any;
}

const CustomInput: React.FC<CustomInputProps> = ({ error, onChangeText, ...props }) => {
  return (
    <YStack>
      <XStack alignItems="center" position="relative">
        <Input
          {...props}
          borderWidth={2}
          borderColor={error ? "red" : "gray"}
          paddingRight={error ? 40 : undefined} 
          onChangeText={onChangeText} 
        />
        {error && (
          <XStack position="absolute" right={10} top="50%" transform="translateY(-50%)">
            <Text color="red" fontWeight="bold">i</Text> 
          </XStack>
        )}
      </XStack>
    </YStack>
  );
};

export default CustomInput;
