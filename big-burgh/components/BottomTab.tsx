import { useState } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";

import { ResourcesType } from "./Data";
import ResourceList from "./ResourceList";

const ScrollContainer = styled.ScrollView`
  width: 100%;
  height: 100%;
`;
const Container = styled.View`
  flex: 1;
  align-items: center;
  margin-top: -64px;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.main};
  border-radius: 20px;
  box-shadow: 0px 4px 4px ${(props) => props.theme.main};
`;

const SearchContainer = styled.View`
  position: absolute;
  flex-direction: row;
  justify-content: space-between;
  top: -48px;
  width: 342px;
  height: 40px;
  background-color: ${(props) => props.theme.main};
  padding: 8px 16px;
  border: 2px solid ${(props) => props.theme.yellow};
  border-radius: 15px;
`;

const SearchInput = styled.TextInput`
  font-family: ${(props) => props.theme.font};
`;

const BottomTab = ({
  resources,
  onResourcePress,
}: {
  resources: ResourcesType;
  onResourcePress: (latitude: number, longitude: number) => void;
}) => {
  const [searchText, setSearchText] = useState("");

  return (
    <Container>
      <ScrollContainer
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 24,
        }}
      >
        <ResourceList resources={resources} onResourcePress={onResourcePress} />
      </ScrollContainer>
      <SearchContainer>
        <SearchInput
          onChangeText={setSearchText}
          value={searchText}
          placeholder="Search for jobs, meals..."
        />
        <FontAwesome5 name="search" size={20} color="black" />
      </SearchContainer>
    </Container>
  );
};

export default BottomTab;
