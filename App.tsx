import { PortalProvider, TamaguiProvider } from "tamagui";
import tamaguiConfig from "./tamagui.config";
import StackNavigator from "./navigation/StackNavigator";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <PortalProvider shouldAddRootHost>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </PortalProvider>
    </TamaguiProvider>
  );
}
