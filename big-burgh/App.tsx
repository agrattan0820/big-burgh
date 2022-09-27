import {
  useFonts,
  Nunito_400Regular,
  Nunito_400Regular_Italic,
  Nunito_700Bold,
  Nunito_700Bold_Italic,
} from "@expo-google-fonts/nunito";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorScheme } from "react-native";
import styled, { ThemeProvider } from "styled-components/native";

import Header from "./components/Header";
import HomeScreen from "./screens/Home";
import SettingsScreen from "./screens/Settings";

const Stack = createNativeStackNavigator();

export default function App() {
  const colorScheme = useColorScheme();

  const theme = {
    main: colorScheme === "dark" ? "#1a1a1a" : "#FFFFFF",
    alternate: colorScheme === "dark" ? "#FFFFFF" : "#1a1a1a",
    blue: "#A2D6F9",
    lightBlue: "#D4ECFC",
    blueShadow: "0px 4px 4px rgba(162, 214, 249, 0.5)",
    yellow: "#FAE588",
    lightYellow: "#FCF0BA",
    yellowShadow: "0px 4px 4px rgba(252, 240, 186, 0.5);",
    font: "Nunito_400Regular",
    fontBold: "Nunito_700Bold",
  };

  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_400Regular_Italic,
    Nunito_700Bold,
    Nunito_700Bold_Italic,
  });

  if (!fontsLoaded) {
    return null;
  }

  const Container = styled.SafeAreaView`
    width: 100%;
    height: 100%;
    position: relative;
    background-color: ${(props) => props.theme.main};
  `;

  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <Container>
          <Header />
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Settings"
              component={SettingsScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </Container>
      </ThemeProvider>
    </NavigationContainer>
  );
}
