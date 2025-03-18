import { TamaguiProvider } from "tamagui";
import tamaguiConfig from "./tamagui.config";
import StackNavigator from "./navigation/StackNavigator";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </TamaguiProvider>
  );
}
