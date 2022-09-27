import { LinearGradient } from "expo-linear-gradient";
import { Dispatch, MutableRefObject, SetStateAction, useRef } from "react";
import {
  Dimensions,
  Keyboard,
  useColorScheme,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import styled from "styled-components/native";

import { ResourcesType } from "./Data";

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

type RegionType = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

/**
 * Function that moves markers of locations that are the same so that they don't overlap
 * TODO: improve performance by optimizing Big O
 * https://github.com/react-native-maps/react-native-maps/issues/350
 */
export const moveSameLocationMarkers = (arr: ResourcesType) => {
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

export const animateToCoordinates = (
  mapView: MutableRefObject<MapView>,
  latitude: number,
  longitude: number
) => {
  mapView.current.animateToRegion(
    {
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    },
    1000
  );
};

const Map = ({
  region,
  setRegion,
  resources,
}: {
  region: RegionType;
  setRegion: Dispatch<SetStateAction<RegionType>>;
  resources: ResourcesType;
}) => {
  const mapView = useRef<MapView>(null);
  const colorScheme = useColorScheme();

  return (
    <>
      {region !== undefined ? (
        <>
          <MapView
            ref={mapView}
            initialRegion={region}
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
      ) : (
        <LocationLoadingContainer>
          <LocationLoadingText>Getting current location...</LocationLoadingText>
          <ActivityIndicator size="large" />
        </LocationLoadingContainer>
      )}
    </>
  );
};

export default Map;
