import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EventsConfigScreen from "../screens/Events/EventsConfigScreen";
import EventsViewScreen  from "../screens/Events/EventsViewScreen"; 

const Stack = createStackNavigator();

export default function EventsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Events" component={EventsConfigScreen} />
      <Stack.Screen name="EventsView" component={EventsViewScreen} />
    </Stack.Navigator>
  );
}