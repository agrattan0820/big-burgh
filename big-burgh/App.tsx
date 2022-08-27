import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import {
  useFonts,
  Nunito_400Regular,
  Nunito_400Regular_Italic,
  Nunito_700Bold,
  Nunito_700Bold_Italic,
} from "@expo-google-fonts/nunito";
import styled, { ThemeProvider } from "styled-components/native";
import MapView from "react-native-maps";
import { LinearGradient } from "expo-linear-gradient";
import Header from "./components/Header";
import ResourceList from "./components/ResourceList";
import { useLocation } from "./components/hooks/useLocation";
import { resources } from "./components/Data";

const Container = styled.View`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: aliceblue;
`;

const LocationText = styled.Text`
  position: absolute;
  top: 72px;
  z-index: 1;
  color: black;
  font-size: 12px;
  padding: 0 16px;
  font-family: ${(props) => props.theme.font};
`;

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

export default function App() {
  const { text, location, setLocation } = useLocation();
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
    <ThemeProvider theme={theme}>
      <Container>
        <Header />
        {/* <LocationText>{text}</LocationText> */}
        {location !== null && (
          <>
            <MapView
              initialRegion={location}
              onRegionChangeComplete={(region) => setLocation(region)}
              style={{
                // position: "absolute",
                // top: 0,
                width: Dimensions.get("window").width,
                height: 500,
              }}
            />
            <LinearGradient
              colors={["rgba(256, 256, 256, 1)", "rgba(256, 256, 256, 0)"]}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                height: 100,
              }}
            />
          </>
        )}
        <ResourceList resources={resources} />
      </Container>
    </ThemeProvider>
  );
}
