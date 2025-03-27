import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/Login/LoginScreen";
import TabNavigator from "./TabNavigator";

type AuthStackParamList = {
  Login: undefined;
  Tabs: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Tabs" component={TabNavigator} />
    </Stack.Navigator>
  );
}
