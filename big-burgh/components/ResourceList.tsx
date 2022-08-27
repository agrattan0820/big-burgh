import { View } from "react-native";
import styled from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { ResourcesType } from "./Data";

interface ColorProps {
  color: "blue" | "yellow";
}

type TypeOfResource = "food" | "job" | "shelter";

const ListContainer = styled.ScrollView`
  margin-top: -64px;
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 20px;
`;

const ResourceEntry = styled.View<ColorProps>`
  flex-direction: row;
  justify-content: space-between;
  border-radius: 20px;
  width: 100%;
  height: 100px;
  margin-bottom: 16px;
  padding: 16px;
  background-color: ${(props) =>
    props.color === "blue" ? props.theme.blue : props.theme.yellow};
  box-shadow: ${(props) =>
    props.color === "blue" ? props.theme.blueShadow : props.theme.yellowShadow};
  font-family: ${(props) => props.theme.font};
`;

const ResourceTitleSection = styled.View<ColorProps>`
  background-color: ${(props) =>
    props.color === "blue" ? props.theme.lightBlue : props.theme.lightYellow};
  padding: 8px;
  width: 180px;
  min-height: 52px;
  border-radius: 8px;
  justify-content: center;
`;

const ResourceTitle = styled.Text`
  font-weight: bold;
  font-size: 14px;
  font-family: ${(props) => props.theme.fontBold};
`;

const ResourceSubtitle = styled.Text`
  padding: 4px 8px;
  font-size: 12px;
  font-family: ${(props) => props.theme.font};
`;

const ResourceTypeText = styled.Text`
  font-family: ${(props) => props.theme.fontBold};
`;

const ResourceType = ({ type }: { type: TypeOfResource }) => {
  const iconMap: Record<TypeOfResource, string> = {
    food: "carrot",
    job: "briefcase",
    shelter: "home",
  };

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginTop: -24,
        paddingRight: 8,
      }}
    >
      {type === "food" ? (
        <>
          <FontAwesome5 name={iconMap[type]} size={82} color="black" />
          <ResourceTypeText>Food</ResourceTypeText>
        </>
      ) : type === "job" ? (
        <>
          <FontAwesome5 name={iconMap[type]} size={82} color="black" />
          <ResourceTypeText>Job</ResourceTypeText>
        </>
      ) : (
        type === "shelter" && (
          <>
            <FontAwesome5 name={iconMap[type]} size={82} color="black" />
            <ResourceTypeText>Shelter</ResourceTypeText>
          </>
        )
      )}
    </View>
  );
};

export default function ResourceList({
  resources,
}: {
  resources: ResourcesType;
}) {
  return (
    <ListContainer contentContainerStyle={{ padding: 16 }}>
      {resources.map((item, i) => (
        <ResourceEntry color={i % 2 === 0 ? "blue" : "yellow"} key={i}>
          <View>
            <ResourceTitleSection color={i % 2 === 0 ? "blue" : "yellow"}>
              <ResourceTitle numberOfLines={2}>{item.name}</ResourceTitle>
            </ResourceTitleSection>
            <ResourceSubtitle>
              {item.address ?? item.hours ?? ""}
            </ResourceSubtitle>
          </View>
          <ResourceType type={item.type as TypeOfResource} />
        </ResourceEntry>
      ))}
    </ListContainer>
  );
}
