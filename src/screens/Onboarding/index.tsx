import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ViewToken,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedRef,
  useAnimatedStyle,
  interpolateColor,
} from 'react-native-reanimated';

import Pagination from './components/Pagination';
import CustomButton from './components/CustomButton';
import RenderItem from './components/OnboardingItem';
import {data, OnboardingData} from './data';
import { useRefsContext } from '@/context';

function Onboarding() {
  const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = useWindowDimensions();
  const {languageChangeSheetRef} = useRefsContext();
  const flatListRef = useAnimatedRef<FlatList<OnboardingData>>();
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);

  const openModal = () => {
    languageChangeSheetRef.current?.scrollTo(-SCREEN_HEIGHT / 1.2);
  };


  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems[0] && viewableItems[0].index !== null) {
      flatListIndex.value = viewableItems[0].index;
    }
  };

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event: any) => {
      x.value = event.contentOffset.x;
    },
  });

  const animatedColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      x.value,
      [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
      ['#ad6f8aee', '#f5f5dcc9', '#c0c0c0cd'],
    );

    return {
      backgroundColor,
    };
  });
  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        onScroll={onScroll}
        data={data}
        renderItem={({item, index}) => (
          <RenderItem item={item} index={index} x={x} openSheet={openModal}/>
        )}
        scrollEventThrottle={16}
        horizontal
        bounces={false}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          minimumViewTime: 300,
          viewAreaCoveragePercentThreshold: 10,
        }}
      />
      <Animated.View style={[styles.bottomContainer, animatedColor]}>
        <Pagination data={data} x={x} />
        <CustomButton
          flatListRef={flatListRef}
          flatListIndex={flatListIndex}
          dataLength={data.length}
          x={x}
        />
      </Animated.View>
    </View>
  );
}

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
