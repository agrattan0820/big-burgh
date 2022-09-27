import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import MapView from "react-native-maps";
import styled from "styled-components/native";

import BottomTab from "../components/BottomTab";
import { ResourceItem, resources, ResourcesType } from "../components/Data";
import Header from "../components/Header";
import Map from "../components/Map";
import MapHeader from "../components/MapHeader";
import { useLocation } from "../components/hooks/useLocation";

const Container = styled.SafeAreaView`
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

export default function HomeScreen({ navigation }) {
  const [selectedResource, setSelectedResource] = useState<ResourceItem>();
  const { location } = useLocation();
  const [region, setRegion] = useState(location);

  const resourcePress = (resource: ResourceItem) => {
    setSelectedResource(resource);
  };

  return (
    <Container>
      <MapHeader navigation={navigation} />
      <Map region={region} setRegion={setRegion} resources={resources} />
      {/* <Header /> */}
      {/* <LocationText>{text}</LocationText> */}
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
