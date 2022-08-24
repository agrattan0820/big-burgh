import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import styled, { ThemeProvider } from "styled-components/native";
import MapView from "react-native-maps";
import { LinearGradient } from "expo-linear-gradient";
import Header from "./components/Header";
import ResourceList from "./components/ResourceList";
import { useLocation } from "./components/hooks/useLocation";

const Container = styled.View`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: aliceblue;
`;

const LocationText = styled.Text`
  position: absolute;
  top: 72;
  z-index: 1;
  color: black;
  font-size: 12px;
  padding: 0 16px;
`;

const theme = {
  blue: "#A2D6F9",
  yellow: "#FAE588",
};

export default function App() {
  const { text, location, setLocation } = useLocation();

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header />
        <LocationText>{text}</LocationText>
        {location !== null && (
          <>
            <MapView
              initialRegion={location}
              onRegionChangeComplete={(region) => setLocation(region)}
              style={{
                // position: "absolute",
                // top: 0,
                width: Dimensions.get("window").width,
                height: 400,
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
        <ResourceList />
      </Container>
    </ThemeProvider>
  );
}
