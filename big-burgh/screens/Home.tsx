import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";

import Header from "../components/Header";
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

export default function HomeScreen({ navigation }) {
  const [selectedResource, setSelectedResource] = useState<ResourceItem>();

  const resourcePress = (resource: ResourceItem) => {
    setSelectedResource(resource);
  };

  return (
    <Container>
      <Header navigation={navigation} />
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
