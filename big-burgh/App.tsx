import {
  useFonts,
  Nunito_400Regular,
  Nunito_400Regular_Italic,
  Nunito_700Bold,
  Nunito_700Bold_Italic,
} from "@expo-google-fonts/nunito";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeProvider } from "styled-components/native";

import HomeScreen from "./screens/Home";

const theme = {
  blue: "#A2D6F9",
  lightBlue: "#D4ECFC",
  blueShadow: "0px 4px 4px rgba(162, 214, 249, 0.5)",
  yellow: "#FAE588",
  lightYellow: "#FCF0BA",
  yellowShadow: "0px 4px 4px rgba(252, 240, 186, 0.5);",
  font: "Nunito_400Regular",
  fontBold: "Nunito_700Bold",
};

const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_400Regular_Italic,
    Nunito_700Bold,
    Nunito_700Bold_Italic,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <Stack.Navigator initialRouteName={"Home"}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </ThemeProvider>
    </NavigationContainer>
  );
}
