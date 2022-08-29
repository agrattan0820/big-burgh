import styled, { useTheme } from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Linking from "expo-linking";

import { ResourceItem } from "./Data";
import { useColorScheme } from "react-native";
import { iconMap } from "./ResourceList";
import { TouchableOpacity } from "react-native-gesture-handler";

/** TYPES */
type ButtonProps = {
  color: "yellow" | "blue";
  dark: boolean;
};

/** STYLED COMPONENTS */

const Container = styled.View`
  width: 100%;
`;

const ResourceHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ResourceTitleContainer = styled.View`
  background-color: ${(props) => props.theme.lightBlue};
  box-shadow: ${(props) => props.theme.blueShadow};
  border-radius: 10px;
  padding: 8px;
  max-width: 300px;
`;

const ResourceTitle = styled.Text`
  font-family: ${(props) => props.theme.fontBold};
  font-size: 24px;
`;

const ResourceTypeContainer = styled.View`
  margin-left: 12px;
  justify-content: center;
  align-items: center;
`;
const ResourceTypeText = styled.Text`
  margin-top: 2px;
  color: ${(props) => props.theme.alternate};
  font-size: 12px;
  font-family: ${(props) => props.theme.fontBold};
`;

const ResourceBody = styled.View`
  margin-top: 16px;
`;

const ResourceEntryName = styled.Text`
  color: ${(props) => props.theme.alternate};
  font-family: ${(props) => props.theme.fontBold};
  font-size: 16px;
  margin-bottom: 4px;
`;

const ResourceEntryText = styled.Text`
  color: ${(props) => props.theme.alternate};

  font-family: ${(props) => props.theme.font};
  font-size: 16px;
  margin-bottom: 4px;
`;

const LargeResourceEntryText = styled.Text`
  color: ${(props) => props.theme.alternate};
  font-family: ${(props) => props.theme.font};
  margin-top: 4px;
  margin-bottom: 16px;
  font-size: 16px;
`;

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled(TouchableOpacity)<ButtonProps>`
  width: 160px;
  height: 56px;
  background-color: ${(props) =>
    props.color === "blue" ? props.theme.blue : props.theme.yellow};
  box-shadow: ${(props) =>
    props.color === "blue" ? props.theme.blueShadow : props.theme.yellowShadow};
  border-radius: 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 14px;
`;

const ButtonText = styled.Text`
  font-size: 20px;
  font-family: ${(props) => props.theme.fontBold};
`;

const ResourcePage = ({ resource }: { resource: ResourceItem }) => {
  const theme = useTheme();

  const colorScheme = useColorScheme();

  const iconColor = (color: "blue" | "yellow") =>
    colorScheme === "light"
      ? theme.alternate
      : color === "blue"
      ? theme.blue
      : theme.yellow;

  return (
    <Container>
      <ResourceHeader>
        <ResourceTitleContainer>
          <ResourceTitle>{resource.name}</ResourceTitle>
        </ResourceTitleContainer>
        <ResourceTypeContainer>
          <FontAwesome5
            name={iconMap[resource.type]}
            size={48}
            color={theme.alternate}
          />
          <ResourceTypeText>
            {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
          </ResourceTypeText>
        </ResourceTypeContainer>
      </ResourceHeader>
      <ResourceBody>
        {resource.address ? (
          <ResourceEntryText>
            <ResourceEntryName>Address: </ResourceEntryName>
            {resource.address}
          </ResourceEntryText>
        ) : null}
        {resource.hours ? (
          <ResourceEntryText>
            <ResourceEntryName>Hours: </ResourceEntryName>
            {resource.hours}
          </ResourceEntryText>
        ) : null}
        {resource.phone ? (
          <ResourceEntryText>
            <ResourceEntryName>Phone: </ResourceEntryName>
            {resource.phone}
          </ResourceEntryText>
        ) : null}
        {resource.description ? (
          <LargeResourceEntryText style={{ marginTop: 16 }}>
            {resource.description}
          </LargeResourceEntryText>
        ) : null}
        {resource.recommended_for ? (
          <>
            <ResourceEntryName>Recommended For:</ResourceEntryName>
            <LargeResourceEntryText>
              {resource.recommended_for}
            </LargeResourceEntryText>
          </>
        ) : null}
        {resource.requirements ? (
          <>
            <ResourceEntryName>Requirements:</ResourceEntryName>
            <LargeResourceEntryText>
              {resource.requirements}
            </LargeResourceEntryText>
          </>
        ) : null}
        <ButtonRow>
          {resource.phone ? (
            <Button
              color="blue"
              dark={colorScheme === "dark"}
              onPress={() => {
                Linking.openURL(`tel:${resource.phone}`);
              }}
            >
              <ButtonText>Contact</ButtonText>
              <FontAwesome5 name="phone" size={24} color="black" />
            </Button>
          ) : null}
          {resource.address ? (
            <Button
              color="yellow"
              dark={colorScheme === "dark"}
              onPress={() => {
                Linking.openURL(
                  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                    resource.address
                  )}+Pittsburgh+PA`
                );
              }}
            >
              <ButtonText>Directions</ButtonText>
              <FontAwesome5 name="location-arrow" size={24} color="black" />
            </Button>
          ) : null}
        </ButtonRow>
      </ResourceBody>
    </Container>
  );
};

export default ResourcePage;
