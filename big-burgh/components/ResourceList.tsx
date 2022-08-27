import { useColorScheme, View } from "react-native";
import styled, { useTheme } from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { ResourcesType } from "./Data";
import { useLocation } from "./hooks/useLocation";

interface ColorProps {
  color: "blue" | "yellow";
}

type TypeOfResource = "food" | "job" | "shelter" | "activity";

const ListContainer = styled.ScrollView`
  margin-top: -64px;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.main};
  border-radius: 20px;
  box-shadow: 0px 4px 4px ${(props) => props.theme.main};
`;

const ResourceEntry = styled.Pressable<ColorProps>`
  flex-direction: row;
  justify-content: space-between;
  border-radius: 20px;
  width: 100%;
  height: 100px;
  margin-bottom: 16px;
  padding: 14px;
  background-color: ${(props) => {
    if (props.theme.main === "#121212") {
      return "transparent";
    }

    return props.color === "blue" ? props.theme.blue : props.theme.yellow;
  }};
  box-shadow: ${(props) => {
    if (props.theme.main === "#121212") {
      return "none";
    }

    return props.color === "blue"
      ? props.theme.blueShadow
      : props.theme.yellowShadow;
  }};
  border: ${(props) => {
    if (props.theme.main === "#FFFFFF") {
      return "none";
    }

    return props.color === "blue"
      ? `1px solid ${props.theme.blue}`
      : `1px solid ${props.theme.yellow}`;
  }};
  font-family: ${(props) => props.theme.font};
`;

const ResourceTitleSection = styled.View<ColorProps>`
  background-color: ${(props) => {
    if (props.theme.main === "#121212") {
      return "#222222";
    }

    return props.color === "blue"
      ? props.theme.lightBlue
      : props.theme.lightYellow;
  }};
  padding: 8px;
  width: 180px;
  min-height: 52px;
  border-radius: 8px;
  justify-content: center;
`;

const ResourceTitle = styled.Text<ColorProps>`
  font-weight: bold;
  font-size: 14px;
  font-family: ${(props) => props.theme.fontBold};
  color: ${(props) => {
    if (props.theme.main === "#FFFFFF") {
      return "black";
    }

    return props.color === "blue" ? props.theme.blue : props.theme.yellow;
  }};
`;

const ResourceSubtitle = styled.Text<ColorProps>`
  padding: 4px 8px;
  font-size: 12px;
  font-family: ${(props) => props.theme.font};
  color: ${(props) => {
    if (props.theme.main === "#FFFFFF") {
      return "black";
    }

    return props.color === "blue" ? props.theme.blue : props.theme.yellow;
  }};
`;

const ResourceTypeText = styled.Text<ColorProps>`
  margin-top: 4px;
  font-family: ${(props) => props.theme.fontBold};
  color: ${(props) => {
    if (props.theme.main === "#FFFFFF") {
      return "black";
    }

    return props.color === "blue" ? props.theme.blue : props.theme.yellow;
  }};
`;

const ResourceType = ({
  type,
  color,
}: {
  type: TypeOfResource;
  color: "blue" | "yellow";
}) => {
  const theme = useTheme();
  const iconMap: Record<TypeOfResource, string> = {
    food: "carrot",
    job: "briefcase",
    shelter: "home",
    activity: "paint-brush",
  };

  const iconColor =
    theme.main === "#FFFFFF"
      ? "black"
      : color === "blue"
      ? theme.blue
      : theme.yellow;

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginTop: -20,
        paddingRight: 8,
      }}
    >
      {type === "food" ? (
        <>
          <FontAwesome5 name={iconMap[type]} size={82} color={iconColor} />
          <ResourceTypeText color={color}>Food</ResourceTypeText>
        </>
      ) : type === "job" ? (
        <>
          <FontAwesome5 name={iconMap[type]} size={82} color={iconColor} />
          <ResourceTypeText color={color}>Job</ResourceTypeText>
        </>
      ) : type === "shelter" ? (
        <>
          <FontAwesome5 name={iconMap[type]} size={82} color={iconColor} />
          <ResourceTypeText color={color}>Shelter</ResourceTypeText>
        </>
      ) : (
        type === "activity" && (
          <>
            <FontAwesome5 name={iconMap[type]} size={82} color={iconColor} />
            <ResourceTypeText color={color}>Activity</ResourceTypeText>
          </>
        )
      )}
    </View>
  );
};

export default function ResourceList({
  resources,
  onResourcePress,
}: {
  resources: ResourcesType;
  onResourcePress: (latitude: number, longitude: number) => void;
}) {
  // const { location, setLocation } = useLocation();

  return (
    <ListContainer
      contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 24 }}
    >
      {resources.map((item, i) => {
        const resourceColor = i % 2 === 0 ? "blue" : "yellow";
        return (
          <ResourceEntry
            color={resourceColor}
            key={i}
            onPress={() => {
              onResourcePress(item.latitude, item.longitude);
            }}
          >
            <View>
              <ResourceTitleSection color={resourceColor}>
                <ResourceTitle color={resourceColor} numberOfLines={2}>
                  {item.name}
                </ResourceTitle>
              </ResourceTitleSection>
              <ResourceSubtitle color={resourceColor}>
                {item.address ?? item.hours ?? ""}
              </ResourceSubtitle>
            </View>
            <ResourceType
              type={item.type as TypeOfResource}
              color={resourceColor}
            />
          </ResourceEntry>
        );
      })}
    </ListContainer>
  );
}
