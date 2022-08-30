import styled from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";
import Logo from "./Logo";

const Container = styled.View`
  width: 100%;
  height: 100px;
  background-color: ${(props) => props.theme.main};
  box-shadow: 0px 4px 4px rgba(220, 220, 220, 0.5);
  margin-bottom: 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
`;

const TitleText = styled.Text`
  font-family: ${(props) => props.theme.fontBold};
  font-size: 40px;
`;

const Header = () => {
  return (
    <Container>
      <Logo />
      <FontAwesome5 name="bars" size={24} color="black" />
    </Container>
  );
};

export default Header;
