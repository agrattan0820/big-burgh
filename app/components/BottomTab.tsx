import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import styled, { useTheme } from "styled-components/native";

import { ResourceItem, ResourcesType } from "./Data";
import ResourceList from "./ResourceList";
import ResourcePage from "./ResourcePage";
import ResourceSearch from "./ResourceSearch";

const ScrollContainer = styled(Animated.ScrollView)`
  width: 100%;
`;
const Container = styled(Animated.View)`
  flex: 1;
  align-items: center;
  margin-top: -200px;
  width: 100%;
  background-color: ${(props) => props.theme.main};
  border-radius: 20px;
  box-shadow: 0px 4px 4px ${(props) => props.theme.main};
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
  const translationY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      if (!selectedResource) {
        translationY.value = Math.min(Math.max(event.contentOffset.y, 0), 150);
      }
    },
    onEndDrag: (event) => {
      if (selectedResource && event.contentOffset.y < -100) {
        runOnJS(setSelectedResource)(undefined);
        translationY.value = 0;
      }
    },
  });

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(150 + translationY.value * -1),
        },
      ],
    };
  });

  useEffect(() => {
    if (selectedResource) {
      translationY.value = 150;
    }
  }, [selectedResource]);

  return (
    <Container style={containerAnimatedStyle}>
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
      <ResourceSearch />
    </Container>
  );
};

export default BottomTab;
