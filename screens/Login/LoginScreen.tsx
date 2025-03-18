import React from "react";
import { View, Text, H4, Button, Spinner, Input, YStack } from "tamagui";
import { useForm } from "react-hook-form";
import { useThemeStore } from "../../store/useThemeStore";
import { StatusBar } from "expo-status-bar";
import CustomInput from "../../components/CustomInput";

type FormData = {
  email: string;
  password: string;
};

export default function LoginScreen({ navigation }: any) {
  const { themeStyles, toggleTheme, theme } = useThemeStore();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  
  const onSubmit = (data: FormData) => {
    console.log("Login Data:", data);
    setTimeout(() => {
      navigation.replace("Tabs");
    }, 1000);
  };

  return (
    <View
      flex={1}
      backgroundColor={themeStyles.background}
      justifyContent="center"
      paddingHorizontal={"$4"}
    >
      <StatusBar style={theme === "light" ? "dark" : "light"} />

      <H4 color={themeStyles.primary} marginBottom="$2" textAlign="center">
        VibraPasto
      </H4>

      <YStack gap="$4" alignItems="center" minWidth={300} padding="$6">
        <Input
          size="$5"
          width={"100%"}
          borderWidth={2}
          placeholder="Email"
          autoFocus
          backgroundColor={themeStyles.inputBg}
          color={themeStyles.text}
          /* {...register("email", {
            required: "El correo es obligatorio",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Correo inválido",
            },
          })} */
          onChangeText={(text) => setValue("email", text)}
        />
        {errors.email && <Text color="red">{errors.email.message}</Text>}

        <CustomInput
          size="$5"
          width={"100%"}
          borderWidth={2}
          autoFocus
          backgroundColor={themeStyles.inputBg}
          color={themeStyles.text}
          placeholder="Escribe algo..."
          error={errors.email ? errors.email.message : undefined}
        />

        <Input
          size="$5"
          width={"100%"}
          borderWidth={2}
          placeholder="Contraseña"
          secureTextEntry
          backgroundColor={themeStyles.inputBg}
          color={themeStyles.text}
          /* {...register("password", {
            required: "La contraseña es obligatoria",
            minLength: {
              value: 6,
              message: "Debe tener al menos 6 caracteres",
            },
          })} */
          onChangeText={(text) => setValue("password", text)}
        />
        {errors.password && <Text color="red">{errors.password.message}</Text>}

        <YStack gap="$4" width="100%" alignItems="center">
          <Button
            width={"100%"}
            fontSize="$5"
            backgroundColor={themeStyles.primary}
            color={themeStyles.textInverted}
            icon={
              isSubmitting
                ? () => <Spinner color={themeStyles.text} />
                : undefined
            }
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Ingresando..." : "Iniciar Sesión"}
          </Button>

          {/* Botón de Registro */}
          <Button
            width={"100%"}
            fontSize="$5"
            backgroundColor={themeStyles.secondary}
            color={themeStyles.textInverted}
          >
            Registrarse
          </Button>
        </YStack>

        <Button
          backgroundColor={themeStyles.primary}
          color={themeStyles.text}
          onPress={toggleTheme}
        >
          Toggle Theme
        </Button>
      </YStack>
    </View>
  );
}
