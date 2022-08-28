import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Keyboard } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import styled, { useTheme } from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";

import { ResourceItem, ResourcesType } from "./Data";
import ResourceList from "./ResourceList";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import ResourcePage from "./ResourcePage";

const ScrollContainer = styled(Animated.ScrollView)`
  width: 100%;
`;
const Container = styled(Animated.View)`
  flex: 1;
  align-items: center;
  margin-top: -64px;
  width: 100%;
  background-color: ${(props) => props.theme.main};
  border-radius: 20px;
  box-shadow: 0px 4px 4px ${(props) => props.theme.main};
`;

const SearchContainer = styled.View`
  position: absolute;
  flex-direction: row;
  justify-content: space-between;
  top: -48px;
  width: 342px;
  height: 40px;
  background-color: ${(props) => props.theme.main};
  padding: 8px 16px;
  border: 2px solid ${(props) => props.theme.yellow};
  border-radius: 15px;
`;

const SearchInput = styled.TextInput`
  font-family: ${(props) => props.theme.font};
  color: ${(props) => props.theme.alternate};
`;

const BottomTab = ({
  selectedResource,
  setSelectedResource,
  resources,
  onResourcePress,
}: {
  selectedResource: ResourceItem;
  setSelectedResource: Dispatch<SetStateAction<ResourceItem>>;
  resources: ResourcesType;
  onResourcePress: (resource: ResourceItem) => void;
}) => {
  const theme = useTheme();
  const [searchText, setSearchText] = useState("");
  const translationY = useSharedValue(64);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      console.log(event.contentOffset.y);

      if (!selectedResource) {
        translationY.value = Math.min(Math.max(event.contentOffset.y, 64), 200);
      }
    },
    onEndDrag: (event) => {
      if (selectedResource && event.contentOffset.y < -100) {
        runOnJS(setSelectedResource)(undefined);
        translationY.value = 64;
      }
    },
  });

  const stylez = useAnimatedStyle(() => {
    return {
      marginTop: withSpring(translationY.value * -1),
    };
  });

  const [keyboardStatus, setKeyboardStatus] = useState(undefined);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus("Keyboard Shown");
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus("Keyboard Hidden");
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    if (selectedResource) {
      translationY.value = 300;
    }
  }, [selectedResource]);

  return (
    <Container style={stylez}>
      <ScrollContainer
        onScroll={scrollHandler}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 24,
        }}
        scrollEventThrottle={16}
      >
        {!selectedResource ? (
          <ResourceList
            resources={resources}
            onResourcePress={onResourcePress}
          />
        ) : (
          <ResourcePage resource={selectedResource} />
        )}
      </ScrollContainer>

      <SearchContainer>
        <SearchInput
          onChangeText={setSearchText}
          value={searchText}
          placeholder="Search for jobs, meals..."
          placeholderTextColor={theme.alternate}
          onBlur={Keyboard.dismiss}
        />
        <FontAwesome5
          name="search"
          size={20}
          placeholder
          color={theme.alternate}
        />
      </SearchContainer>
    </Container>
  );
};

export default BottomTab;
