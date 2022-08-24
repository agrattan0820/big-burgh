import { View, Text } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  position: absolute;
  text-align: center;
  top: 48px;
  z-index: 10;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
`;

const Title = styled.Text`
  text-align: center;
  font-size: 18px;
  color: black;
  font-weight: bold;
`;

export default function Header() {
  return (
    <Container>
      <Title>Big Burgh</Title>
    </Container>
  );
}
