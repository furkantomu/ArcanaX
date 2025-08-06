import React, { memo } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';

import { getStyles } from '../style';
import { useTarotContext } from '../TarotContext';

import { useHaptic } from '@/utils';

const Card = ({ backImageSource, item }: any) => {
  const { selectedCards, addCard, removeCard, readingType } = useTarotContext();
  const styles = getStyles();
  const isFlipped = useSharedValue(false);
  const translateY = useSharedValue(0);
  const haptic = useHaptic('soft');

  const handlePress = () => {
    isFlipped.value = !isFlipped.value;

    if (!isFlipped.value) {
      if (selectedCards.length < readingType) {
        translateY.value = withDelay(
          200,
          withSpring(-50, { damping: 12, stiffness: 100 }),
        );
        addCard(item);
      }
    } else {
      translateY.value = withDelay(
        200,
        withSpring(0, { damping: 12, stiffness: 100 }),
      );
      removeCard(item);
    }
    haptic?.();
  };

  const regularCardAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <Animated.View style={[styles.cardContainer]}>
      <Animated.View style={[regularCardAnimatedStyle]}>
        <TouchableOpacity onPress={handlePress} activeOpacity={1}>
          <Image source={backImageSource} style={styles.card} />
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

export default memo(Card);
