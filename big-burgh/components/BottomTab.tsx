import { useState } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import styled, { useTheme } from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";

import { ResourcesType } from "./Data";
import ResourceList from "./ResourceList";
import Animated, {
  Easing,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

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
  resources,
  onResourcePress,
}: {
  resources: ResourcesType;
  onResourcePress: (latitude: number, longitude: number) => void;
}) => {
  const theme = useTheme();
  const [searchText, setSearchText] = useState("");
  const translationY = useSharedValue(64);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationY.value = Math.min(Math.max(event.contentOffset.y, 64), 200);
  });

  const stylez = useAnimatedStyle(() => {
    return {
      // transform: [
      //   {
      //     translateY: withSpring(translationY.value * -1),
      //   },
      // ],
      marginTop: withSpring(translationY.value * -1),
      // marginTop: translationY.value * -64,
    };
  });

  return (
    <Container style={stylez}>
      <ScrollContainer
        onScroll={scrollHandler}
        style={{ width: "100%", height: "100%" }}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 24,
        }}
        scrollEventThrottle={16}
      >
        <ResourceList resources={resources} onResourcePress={onResourcePress} />
      </ScrollContainer>
      <SearchContainer>
        <SearchInput
          onChangeText={setSearchText}
          value={searchText}
          placeholder="Search for jobs, meals..."
          placeholderTextColor={theme.alternate}
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
