import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import { Keyboard } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import styled, { useTheme } from "styled-components/native";

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

const SearchInput = styled(TextInput)`
  font-family: ${(props) => props.theme.font};
  color: ${(props) => props.theme.alternate};
`;

const ResourceSearch = () => {
  const [searchText, setSearchText] = useState("");
  const theme = useTheme();

  return (
    <SearchContainer>
      <SearchInput
        onChangeText={setSearchText}
        value={searchText}
        placeholder="Search for jobs, meals..."
        placeholderTextColor={theme.alternate}
        onBlur={Keyboard.dismiss}
      />
      <FontAwesome5
        name="search"
        size={20}
        placeholder
        color={theme.alternate}
      />
    </SearchContainer>
  );
};

export default ResourceSearch;
