import { ScrollView, Text } from "react-native";
import styled from "styled-components/native";

const ListContainer = styled.ScrollView`
  width: 100%;
  height: 100%;
  background-color: white;
`;

const ListEntry = styled.View`
  border-radius: 20px;
  width: 100%;
  background-color: ${(props) => props.theme.blue};
`;

export default function ResourceList() {
  return (
    <ScrollView
      contentContainerStyle={{ backgroundColor: "white", padding: 8 }}
    >
      <ListEntry>
        <Text>Something</Text>
      </ListEntry>
      <ListEntry>
        <Text>Something</Text>
      </ListEntry>
      <ListEntry>
        <Text>Something</Text>
      </ListEntry>
    </ScrollView>
  );
}
