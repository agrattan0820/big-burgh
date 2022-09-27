import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import styled from "styled-components/native";

import { ResourceItem, resources, ResourcesType } from "../components/Data";
import ResourceList from "../components/ResourceList";
import ResourcePage from "../components/ResourcePage";
import ResourceSearch from "../components/ResourceSearch";

const Container = styled.SafeAreaView`
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

export default function HomeScreen({ navigation }) {
  const [selectedResource, setSelectedResource] = useState<ResourceItem>();

  const resourcePress = (resource: ResourceItem) => {
    setSelectedResource(resource);
  };

  return (
    <Container>
      <ScrollContainer
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 24,
        }}
        scrollEventThrottle={16}
      >
        <ResourceSearch />
        {!selectedResource ? (
          <ResourceList resources={resources} onResourcePress={resourcePress} />
        ) : (
          <ResourcePage resource={selectedResource} />
        )}
      </ScrollContainer>
      <StatusBar style="auto" />
    </Container>
  );
}
