import { ScrollView, Text } from "react-native";
import styled from "styled-components/native";

const ListContainer = styled.ScrollView`
  margin-top: -64px;
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 20px;
`;

const ListEntry = styled.View`
  border-radius: 20px;
  width: 100%;
  height: 100px;
  margin-bottom: 16px;
  padding: 16px;
  background-color: ${(props) => props.theme.blue};
  box-shadow: ${(props) => props.theme.blueShadow};
`;

const ListTitleSection = styled.View`
  background-color: ${(props) => props.theme.lightBlue};
  justify-content: center;
  padding: 8px;
  width: 180px;
  height: 52px;
  border-radius: 8px;
`;

const ListTitle = styled.Text`
  font-weight: bold;
  font-size: 14px;
`;

const ListSubtitle = styled.Text`
  padding: 4px 8px;
  font-size: 12px;
`;

export default function ResourceList({ resources }) {
  return (
    <ListContainer contentContainerStyle={{ padding: 16 }}>
      {resources.map((item, i) => (
        <ListEntry key={i}>
          <ListTitleSection>
            <ListTitle numberOfLines={2}>{item.name}</ListTitle>
          </ListTitleSection>
          <ListSubtitle>{item.address ?? item.hours ?? ""}</ListSubtitle>
        </ListEntry>
      ))}
    </ListContainer>
  );
}
