import { FontAwesome } from "@expo/vector-icons";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled, { useTheme } from "styled-components/native";

const Container = styled.View`
  position: absolute;
  text-align: center;
  top: 64px;
  z-index: 8;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
`;

const Title = styled.Text`
  text-align: center;
  font-size: 18px;
  color: ${(props) => props.theme.alternate};
  font-weight: bold;
  font-family: ${(props) => props.theme.fontBold};
`;

const SettingsButton = styled.View`
  z-index: 10;
  position: absolute;
  top: 56px;
  left: 32px;
  width: 48px;
  height: 48px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.main};
  color: ${(props) => props.theme.alternate};
  border-radius: 99999px;
`;

export default function MapHeader({ navigation }) {
  const theme = useTheme();

  return (
    <>
      <SettingsButton>
        <TouchableOpacity
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("Settings")}
        >
          <FontAwesome name="gear" size={32} color={theme.alternate} />
        </TouchableOpacity>
      </SettingsButton>
      <Container>
        <Title>Big Burgh</Title>
      </Container>
    </>
  );
}
