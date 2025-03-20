import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/Home/HomeScreen";
import { useThemeStore } from "../store/useThemeStore";
import { View } from "tamagui";
import EventsStack from "./EventsStack";

type RootTabParamList = {
  Home: undefined;
  Events: undefined;
  Profile: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function TabNavigator() {
  const { themeStyles } = useThemeStore();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case "Home":
              iconName = "home-outline";
              break;
            case "Events":
              iconName = "calendar-outline";
              break;
            case "Profile":
              iconName = "person-outline";
              break;
            case "Settings":
              iconName = "settings-outline";
              break;
            default:
              iconName = "ellipse-outline";
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: themeStyles.secondary,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0,
          elevation: 20,
          height: 60,
          position: "absolute", // Evita desplazamientos
          bottom: 0, // Asegura que la barra esté pegada abajo
          paddingBottom: 0, // Elimina espacio extra en la parte inferior
          paddingTop: 10, // Agrega espacio arriba en lugar de abajo
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
        animation: "shift",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Events" component={EventsStack} />
    </Tab.Navigator>
  );
}
