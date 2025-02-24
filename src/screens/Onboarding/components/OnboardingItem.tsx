import {StyleSheet, View, useWindowDimensions, Image} from 'react-native';
import React from 'react';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import {OnboardingData} from '../data';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '@/styles/theme';
import {Typography} from '@/components';

type Props = {
  index: number;
  x: SharedValue<number>;
  item: OnboardingData;
};

function RenderItem({index, x, item}: Props) {
  const {width: SCREEN_WIDTH} = useWindowDimensions();

  const lottieAnimationStyle = useAnimatedStyle(() => {
    const translateYAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [200, 0, -200],
      Extrapolation.CLAMP,
    );

    return {
      transform: [{translateY: translateYAnimation}],
    };
  });

  const circleAnimation = useAnimatedStyle(() => {
    const scale = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [1, 4, 4],
      Extrapolation.CLAMP,
    );

    return {
      transform: [{scale}],
    };
  });
  return (
    <View style={[styles.itemContainer, {width: SCREEN_WIDTH}]}>
      <View style={styles.circleContainer}>
        <Animated.View
          style={[
            {
              width: SCREEN_WIDTH,
              height: SCREEN_WIDTH,
              borderRadius: SCREEN_WIDTH / 2,
              backgroundColor: item.backgroundColor,
            },
            circleAnimation,
          ]}
        />
      </View>

      <LinearGradient
        colors={[COLORS.black, COLORS.blackOpacity, COLORS.black]}
        style={styles.linearGradient}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}
        locations={[1, 0.5, 0.1]}
      />
      <Animated.Image
        source={item.image}
        resizeMode={'cover'}
        style={[styles.image, lottieAnimationStyle]}
      />
      <View style={styles.logoContainer}>
        <Image
          source={require('../../../../assets/logo/logo.png')}
          style={styles.logo}
          resizeMode={'contain'}
        />
      </View>
      <View style={styles.content}>
        <Typography
          style={{...styles.itemText, color: item.textColor}}
          size={'title'}
          weight={'NotoSerifCondensedBoldItalic'}>
          {item.text}
        </Typography>

        <Animated.View
          style={[styles.descriptionContainer, lottieAnimationStyle]}>
          <Typography
            weight={'regular'}
            size={'medium'}
            style={{...styles.itemDescription, color: item.textColor}}>
            {item.description}
          </Typography>
        </Animated.View>
      </View>
    </View>
  );
}

export default RenderItem;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 0,
  },
  linearGradient: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1,
  },
  logoContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    position:'absolute',
    top: 60,
  },
  logo: {
    height: 30,
    width: 120,
  },
  content: {
    gap: 30,
  },
  itemText: {
    textAlign: 'left',
    marginHorizontal: 20,
    zIndex: 2,
  },
  descriptionContainer: {
    zIndex: 2,
    marginHorizontal: 20,
    backgroundColor: COLORS.blackOpacity1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 20,
  },
  itemDescription: {
    textAlign: 'left',
  },
  circleContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
