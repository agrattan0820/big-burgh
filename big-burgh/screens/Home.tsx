import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Keyboard,
  useColorScheme,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";

import Header from "../components/Header";
import ResourceList from "../components/ResourceList";
import { useLocation } from "../components/hooks/useLocation";
import { ResourceItem, resources, ResourcesType } from "../components/Data";
import BottomTab from "../components/BottomTab";

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

const LocationLoadingContainer = styled.View`
  justify-content: center;
  align-items: center;
  height: 500px;
  background-color: ${(props) => props.theme.main};
`;

const LocationLoadingText = styled.Text`
  color: ${(props) => props.theme.alternate};
  font-family: ${(props) => props.theme.font};
  font-size: 18px;
  margin-bottom: 8px;
`;

export default function HomeScreen({ navigation }) {
  const [selectedResource, setSelectedResource] = useState<ResourceItem>();
  const { location } = useLocation();
  const [region, setRegion] = useState(location);
  const mapView = useRef<MapView>(null);
  const colorScheme = useColorScheme();

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

  const resourcePress = (resource: ResourceItem) => {
    setSelectedResource(resource);
    animateToCoordinates(resource.latitude, resource.longitude);
  };

  /**
   * Function that moves markers of locations that are the same so that they don't overlap
   * TODO: improve performance by optimizing Big O
   * https://github.com/react-native-maps/react-native-maps/issues/350
   */
  const moveSameLocationMarkers = (arr: ResourcesType) => {
    const hash = Object.create(null);
    const result = arr.map((x) => {
      const latLng = `${x.latitude}_${x.longitude}`;
      if (hash[latLng]) {
        return {
          ...x,
          latitude: x.latitude - 0.0001,
          longitude: x.longitude - 0.0001,
        };
      }
      hash[latLng] = true;
      return x;
    });
    return result;
  };

  const filteredResources = moveSameLocationMarkers(resources);

  return (
    <Container>
      <Header navigation={navigation} />
      {/* <LocationText>{text}</LocationText> */}
      {region !== undefined ? (
        <>
          <MapView
            ref={mapView}
            initialRegion={location}
            onRegionChangeComplete={(region) => setRegion(region)}
            showsUserLocation={true}
            showsMyLocationButton={true}
            followsUserLocation={false}
            onTouchStart={() => Keyboard.dismiss()}
            style={{
              // position: "absolute",
              // top: 0,
              width: Dimensions.get("window").width,
              height: 500,
            }}
          >
            {filteredResources.map((resource, i) => (
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
      ) : (
        <LocationLoadingContainer>
          <LocationLoadingText>Getting current location...</LocationLoadingText>
          <ActivityIndicator size="large" />
        </LocationLoadingContainer>
      )}
      <BottomTab
        selectedResource={selectedResource}
        setSelectedResource={setSelectedResource}
        resources={resources}
        onResourcePress={resourcePress}
      />
      <StatusBar style="auto" />
    </Container>
  );
}
