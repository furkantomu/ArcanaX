import {View, StyleSheet, useWindowDimensions, ViewToken} from 'react-native';
import React, {useEffect, useState} from 'react';
import Animated, {
  interpolateColor,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import Pagination from './components/Pagination';
import CustomButton from './components/CustomButton';
import {useRefsContext} from '@/context';
import {data, OnboardingData} from './data';
import RenderItem from './components/OnboardingItem';
import {FlatList} from 'react-native-gesture-handler';
import {useOnboardingContext} from './OnboardingContext';

const FlatListRender = () => {
  const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = useWindowDimensions();
  const {languageChangeSheetRef} = useRefsContext();
  const flatListRef = useAnimatedRef<FlatList<OnboardingData>>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);
  const {
    email,
    fullName,
    birthdate,
    password,
    isScrollEnabled,
    contextErrors,
    setScrollEnabled,
  } = useOnboardingContext();
  const openModal = () => {
    languageChangeSheetRef.current?.scrollTo(-SCREEN_HEIGHT / 1.2);
  };

  useEffect(() => {
    checkFormCompletion(currentIndex);
  }, [email, fullName, birthdate, password, currentIndex]);

  const isBirthdateComplete = (birthdate) => {
    return (
      birthdate.day.trim() !== '' &&
      birthdate.month.trim() !== '' &&
      birthdate.year.trim() !== '' &&
      birthdate.gender.trim() !== ''
    );
  };

  const checkFormCompletion = (index: number) => {
    switch (index) {
      case 1:
        setScrollEnabled(email.trim() !== '');
        break;
      case 2:
        setScrollEnabled(fullName.trim() !== '');
        break;
      // case 3:
      //   setScrollEnabled(isBirthdateComplete(birthdate));
      //   break;
      case 4:
        setScrollEnabled(password.trim() !== '');
        break;
      default:
        setScrollEnabled(true);
    }
  };

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems[0] && viewableItems[0].index !== null) {
      flatListIndex.value = viewableItems[0].index;
      const index = viewableItems[0].index;
      setCurrentIndex(index);
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
          <RenderItem item={item} index={index} x={x} openSheet={openModal} />
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
        scrollEnabled={isScrollEnabled && !contextErrors}
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
};

export default FlatListRender;

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
