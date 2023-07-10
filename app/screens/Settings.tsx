import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.main};
`;

const HelloText = styled.Text`
  color: ${(props) => props.theme.alternate};
`;

export default function SettingsScreen({ navigation }) {
  return (
    <Container>
      <HelloText>Hello</HelloText>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <HelloText>Go back to home</HelloText>
      </TouchableOpacity>
    </Container>
  );
}
