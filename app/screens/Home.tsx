import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import {
  Dimensions,
  Keyboard,
  useColorScheme,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import styled from "styled-components/native";

import BottomTab from "../components/BottomTab";
import { ResourceItem, resources, ResourcesType } from "../components/Data";
import { animateToCoordinates } from "../components/Map";
import MapHeader from "../components/MapHeader";
import { useLocation } from "../components/hooks/useLocation";

const Container = styled.View`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: ${(props) => props.theme.main};
`;

const ScrollContainer = styled.ScrollView`
  width: 100%;
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

  const resourcePress = (resource: ResourceItem) => {
    setSelectedResource(resource);
    animateToCoordinates(mapView, resource.latitude, resource.longitude);
  };

  /**
   * Function that moves markers of locations that are the same so that they don't overlap
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
      <MapHeader navigation={navigation} />
      {region !== undefined ? (
        <>
          <MapView
            ref={mapView}
            initialRegion={location}
            onRegionChangeComplete={(region) => setRegion(region)}
            showsUserLocation
            showsMyLocationButton
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
      {/* <Header /> */}
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
