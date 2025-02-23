import React from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  AnimatedRef,
  SharedValue,
  interpolateColor,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {Icon} from '@/components';
import {OnboardingData} from '../data';
import {COLORS} from '@/styles/theme';
import {useHaptic, useScaleAnimation} from '@/utils';
import {useNavigation} from '@react-navigation/native';

type Props = {
  dataLength: number;
  flatListIndex: SharedValue<number>;
  flatListRef: AnimatedRef<FlatList<OnboardingData>>;
  x: SharedValue<number>;
};

function CustomButton({flatListRef, flatListIndex, dataLength, x}: Props) {
  const navigation = useNavigation();
  const {width: SCREEN_WIDTH} = useWindowDimensions();
  const haptic = useHaptic('soft');
  const {handlers, animatedStyle} = useScaleAnimation();

  const buttonAnimationStyle = useAnimatedStyle(() => ({
    width:
      flatListIndex.value === dataLength - 1 ? withSpring(140) : withSpring(60),
    height: 60,
  }));

  const arrowAnimationStyle = useAnimatedStyle(() => ({
    width: 30,
    height: 30,
    opacity:
      flatListIndex.value === dataLength - 1 ? withTiming(0) : withTiming(1),
    transform: [
      {
        translateX:
          flatListIndex.value === dataLength - 1
            ? withTiming(100)
            : withTiming(0),
      },
    ],
  }));

  const textAnimationStyle = useAnimatedStyle(() => ({
    opacity:
      flatListIndex.value === dataLength - 1 ? withTiming(1) : withTiming(0),
    transform: [
      {
        translateX:
          flatListIndex.value === dataLength - 1
            ? withTiming(0)
            : withTiming(-100),
      },
    ],
  }));
  const animatedColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      x.value,
      [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
      ['#e586af76', COLORS.cream, COLORS.silverGray],
    );

    return {
      backgroundColor,
    };
  });

  const handlePress = async () => {
    if (flatListIndex.value < dataLength - 1) {
      flatListRef.current?.scrollToIndex({
        index: flatListIndex.value + 1,
      });
    } else {
      navigation.navigate('Login');
    }

    //await AsyncStorage.setItem('onboardingCompleted', 'true');
    haptic?.();
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress} {...handlers}>
      <Animated.View
        style={[
          styles.container,
          buttonAnimationStyle,
          animatedColor,
          animatedStyle,
        ]}>
        <Animated.Text style={[styles.textButton, textAnimationStyle]}>
          Keşfe Başla
        </Animated.Text>
        <Animated.View style={[styles.iconContainer, arrowAnimationStyle]}>
          <Icon name="rightArrow" size={40} style={styles.arrow} />
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e2169',
    padding: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  arrow: {
    position: 'absolute',
    tintColor: 'white',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {color: 'white', fontSize: 16, position: 'absolute'},
});
