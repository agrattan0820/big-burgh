import { useColorScheme, View } from "react-native";
import styled, { useTheme } from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { ResourcesType } from "./Data";
import { useLocation } from "./hooks/useLocation";
import { TouchableOpacity } from "react-native-gesture-handler";

/** TYPES */
interface ColorProps {
  color: "blue" | "yellow";
  dark: boolean;
}

type TypeOfResource = "food" | "job" | "shelter" | "activity";

/** Used to grab type from resources data */
type ArrElement<ArrType> = ArrType extends readonly (infer ElementType)[]
  ? ElementType
  : never;

/** STYLED COMPONENTS */

const ResourceEntryContainer = styled.View<ColorProps>`
  flex-direction: row;
  justify-content: space-between;
  border-radius: 20px;
  width: 100%;
  height: 100px;
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
  onResourcePress: (latitude: number, longitude: number) => void;
  item: ArrElement<ResourcesType>;
  dark: boolean;
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onResourcePress(item.latitude, item.longitude);
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
  onResourcePress: (latitude: number, longitude: number) => void;
}) {
  const colorScheme = useColorScheme();

  return (
    <>
      {resources.map((item, i) => {
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
    </>
  );
}
