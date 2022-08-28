import { useState } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";

import { ResourcesType } from "./Data";
import ResourceList from "./ResourceList";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const ScrollContainer = styled(Animated.ScrollView)`
  width: 100%;
  height: 100%;
`;
const Container = styled(Animated.View)`
  flex: 1;
  align-items: center;
  width: 100%;
  height: 100%;
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
`;

const BottomTab = ({
  resources,
  onResourcePress,
}: {
  resources: ResourcesType;
  onResourcePress: (latitude: number, longitude: number) => void;
}) => {
  const [searchText, setSearchText] = useState("");
  const translationY = useSharedValue(-64);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationY.value = event.contentOffset.y;
    console.log(translationY.value);
  });

  const stylez = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translationY.value * -1,
        },
      ],
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
      >
        <ResourceList resources={resources} onResourcePress={onResourcePress} />
      </ScrollContainer>
      <SearchContainer>
        <SearchInput
          onChangeText={setSearchText}
          value={searchText}
          placeholder="Search for jobs, meals..."
        />
        <FontAwesome5 name="search" size={20} color="black" />
      </SearchContainer>
    </Container>
  );
};

export default BottomTab;
