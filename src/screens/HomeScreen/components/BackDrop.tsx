import React from 'react';
import {StyleSheet, ImageSourcePropType} from 'react-native';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {SIZES} from '@/styles/theme';

interface BackDropProps {
  image: ImageSourcePropType;
  index: number;
  scrollX: SharedValue<number>;
}

const BackDrop: React.FC<BackDropProps> = ({image, index, scrollX}) => {
  const backDropStyle = {
    width: SIZES.width,
    height: SIZES.height * 4,
  };
  const rnAnimatedImageStyle = useAnimatedStyle(() => {
    const inputRange = [index - 1, index, index + 1];
    return {
      opacity: interpolate(scrollX.value, inputRange, [0, 1, 0]),
    };
  });
  return (
    <Animated.Image
      source={image}
      style={[
        StyleSheet.absoluteFillObject,
        rnAnimatedImageStyle,
        backDropStyle,
      ]}
      resizeMode={'cover'}
      blurRadius={30}
    />
  );
};

export default BackDrop;
