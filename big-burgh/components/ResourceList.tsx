import { FontAwesome5 } from "@expo/vector-icons";
import { useColorScheme, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled, { useTheme } from "styled-components/native";

import { sortResourceByCrow } from "./CalcCrow";
import { ResourceItem, ResourcesType } from "./Data";
import { useLocation } from "./hooks/useLocation";

/** TYPES */
interface ColorProps {
  color: "blue" | "yellow";
  dark: boolean;
}

type TypeOfResource = "food" | "job" | "shelter" | "activity";

/** STYLED COMPONENTS */

const ResourceListContainer = styled.View`
  margin-top: 16px;
`;

const ResourceEntryContainer = styled.View<ColorProps>`
  flex-direction: row;
  justify-content: space-between;
  border-radius: 20px;
  width: 342px;
  height: 100px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 16px;
  padding: 14px;
  background-color: ${(props) => {
    if (props.dark) {
      return "transparent";
    }

    return props.color === "blue" ? props.theme.blue : props.theme.yellow;
  }};
  box-shadow: ${(props) => {
    if (props.dark) {
      return "none";
    }

    return props.color === "blue"
      ? props.theme.blueShadow
      : props.theme.yellowShadow;
  }};
  border: ${(props) => {
    if (!props.dark) {
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
    if (props.dark) {
      return "#262626";
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
    if (!props.dark) {
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
    if (!props.dark) {
      return "black";
    }

    return props.color === "blue" ? props.theme.blue : props.theme.yellow;
  }};
`;

const ResourceTypeText = styled.Text<ColorProps>`
  margin-top: 4px;
  font-family: ${(props) => props.theme.fontBold};
  color: ${(props) => {
    if (!props.dark) {
      return "black";
    }

    return props.color === "blue" ? props.theme.blue : props.theme.yellow;
  }};
`;

/** COMPONENTS */

export const iconMap: Record<TypeOfResource, string> = {
  food: "carrot",
  job: "briefcase",
  shelter: "home",
  activity: "paint-brush",
};

/**
 * Displays the appropriate FontAwesome icon based on the resource type in an entry
 *
 * @returns ReactNode component
 */
const ResourceType = ({
  type,
  color,
  dark,
}: {
  type: TypeOfResource;
  color: "blue" | "yellow";
  dark: boolean;
}) => {
  const theme = useTheme();
  const colorScheme = useColorScheme();

  const iconColor =
    colorScheme === "light"
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
          <ResourceTypeText dark={dark} color={color}>
            Food
          </ResourceTypeText>
        </>
      ) : type === "job" ? (
        <>
          <FontAwesome5 name={iconMap[type]} size={82} color={iconColor} />
          <ResourceTypeText dark={dark} color={color}>
            Job
          </ResourceTypeText>
        </>
      ) : type === "shelter" ? (
        <>
          <FontAwesome5 name={iconMap[type]} size={82} color={iconColor} />
          <ResourceTypeText dark={dark} color={color}>
            Shelter
          </ResourceTypeText>
        </>
      ) : (
        type === "activity" && (
          <>
            <FontAwesome5 name={iconMap[type]} size={82} color={iconColor} />
            <ResourceTypeText dark={dark} color={color}>
              Activity
            </ResourceTypeText>
          </>
        )
      )}
    </View>
  );
};

/**
 * Pressable resource option that displays title, address, and type
 *
 * @returns ReactNode component
 */
const ResourceEntry = ({
  resourceColor,
  onResourcePress,
  item,
  dark,
}: {
  resourceColor: "blue" | "yellow";
  onResourcePress: (resource: ResourceItem) => void;
  item: ResourceItem;
  dark: boolean;
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onResourcePress(item);
      }}
    >
      <ResourceEntryContainer dark={dark} color={resourceColor}>
        <View>
          <ResourceTitleSection dark={dark} color={resourceColor}>
            <ResourceTitle dark={dark} color={resourceColor} numberOfLines={2}>
              {item.name}
            </ResourceTitle>
          </ResourceTitleSection>
          <ResourceSubtitle dark={dark} color={resourceColor}>
            {item.address ?? item.hours ?? ""}
          </ResourceSubtitle>
        </View>
        <ResourceType
          type={item.type as TypeOfResource}
          color={resourceColor}
          dark={dark}
        />
      </ResourceEntryContainer>
    </TouchableOpacity>
  );
};

export default function ResourceList({
  resources,
  onResourcePress,
}: {
  resources: ResourcesType;
  onResourcePress: (resource: ResourceItem) => void;
}) {
  const colorScheme = useColorScheme();
  const { location } = useLocation();

  return (
    location !== null && (
      <ResourceListContainer>
        {resources
          .sort((a, b) => {
            return sortResourceByCrow(
              location.latitude,
              location.longitude,
              a,
              b
            );
          })
          .map((item, i) => {
            const resourceColor = i % 2 === 0 ? "blue" : "yellow";
            return (
              <ResourceEntry
                key={i}
                resourceColor={resourceColor}
                onResourcePress={onResourcePress}
                item={item}
                dark={colorScheme === "dark"}
              />
            );
          })}
      </ResourceListContainer>
    )
  );
}
