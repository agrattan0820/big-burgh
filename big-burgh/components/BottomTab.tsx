import { useState } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { ResourcesType } from "./Data";
import ResourceList from "./ResourceList";

const ScrollContainer = styled.ScrollView`
  margin-top: -64px;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.main};
  border-radius: 20px;
  box-shadow: 0px 4px 4px ${(props) => props.theme.main};
`;

const SearchInput = styled.TextInput`
  position: absolute;

  top: -80px;
  width: 300px;
  height: 40px;
  background-color: ${(props) => props.theme.main};
  padding: 8px;
  font-family: ${(props) => props.theme.font};
`;

const BottomTab = ({
  resources,
  onResourcePress,
}: {
  resources: ResourcesType;
  onResourcePress: (latitude: number, longitude: number) => void;
}) => {
  const [text, onChangeText] = useState("Search");

  return (
    <ScrollContainer
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingVertical: 24,
        flexGrow: 1,
      }}
    >
      <ResourceList resources={resources} onResourcePress={onResourcePress} />
    </ScrollContainer>
    // <SearchInput onChangeText={onChangeText} value={text} />
  );
};

export default BottomTab;
