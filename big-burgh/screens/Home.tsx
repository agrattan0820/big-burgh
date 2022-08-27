import { useRef } from "react";
import { Dimensions, useColorScheme } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";

import Header from "../components/Header";
import ResourceList from "../components/ResourceList";
import { useLocation } from "../components/hooks/useLocation";
import { resources } from "../components/Data";

const Container = styled.View`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: ${(props) => props.theme.main};
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
export default function HomeScreen() {
  const mapView = useRef<MapView>(null);
  const colorScheme = useColorScheme();
  const { text, location, setLocation } = useLocation();

  const animateToCoordinates = (latitude: number, longitude: number) => {
    mapView.current.animateToRegion(
      {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      1000
    );
  };

  return (
    <Container>
      <Header />
      {/* <LocationText>{text}</LocationText> */}
      {location !== null && (
        <>
          <MapView
            ref={mapView}
            initialRegion={location}
            onRegionChangeComplete={(region) => setLocation(region)}
            style={{
              // position: "absolute",
              // top: 0,
              width: Dimensions.get("window").width,
              height: 500,
            }}
          >
            {resources.map((resource, i) => (
              <Marker
                key={i}
                coordinate={{
                  latitude: resource.latitude,
                  longitude: resource.longitude,
                }}
                title={resource.name}
                description={resource.address}
              />
            ))}
          </MapView>
          <LinearGradient
            colors={
              colorScheme === "dark"
                ? ["rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 0)"]
                : ["rgba(256, 256, 256, 1)", "rgba(256, 256, 256, 0)"]
            }
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
      <ResourceList
        resources={resources}
        onResourcePress={animateToCoordinates}
      />
      <StatusBar style="auto" />
    </Container>
  );
}
