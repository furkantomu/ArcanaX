import {Dimensions, StyleSheet, View} from 'react-native';
import React, {useCallback, useImperativeHandle} from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import {BottomSheetRefProps} from '@/types';
import {COLORS} from '@/styles/theme';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 150;

type BottomSheetProps = {
  children?: JSX.Element;
  backgroundColor?: string;
  lineColor?: string;
};

const BottomSheet = React.forwardRef<BottomSheetRefProps, BottomSheetProps>(
  (
    {children, backgroundColor = COLORS.black, lineColor = COLORS.cream},
    ref,
  ) => {
    const translateY = useSharedValue(0);
    const opacity = useSharedValue(0);

    const context = useSharedValue({
      y: 0,
    });

    const scrollTo = useCallback(
      (destination: number) => {
        'worklet';
        translateY.value = withSpring(destination, {
          stiffness: 420,
          damping: 27,
        });

        opacity.value = withSpring(destination === 0 ? 0 : 1, {
          damping: 12,
          stiffness: 200,
        });
      },
      [translateY, opacity],
    );

    useImperativeHandle(ref, () => ({scrollTo}), [scrollTo]);

    const SWIPE_VELOCITY_THRESHOLD = 1000;
    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = {
          y: translateY.value,
        };
      })
      .onUpdate(event => {
        translateY.value = event.translationY + context.value.y;
        translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
      })
      .onEnd(event => {
        const isFastSwipe =
          Math.abs(event.velocityY) > SWIPE_VELOCITY_THRESHOLD;

        if (isFastSwipe) {
          if (event.velocityY < 0) {
            scrollTo(MAX_TRANSLATE_Y);
          } else {
            scrollTo(0);
          }
        } else {
          if (translateY.value < -SCREEN_HEIGHT / 2) {
            scrollTo(MAX_TRANSLATE_Y);
          } else {
            scrollTo(0);
          }
        }
      });

    const rBottomSheetStyles = useAnimatedStyle(() => {
      return {
        opacity: opacity.value,
        transform: [
          {
            translateY: translateY.value,
          },
        ],
      };
    });

    return (
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            styles.container,
            rBottomSheetStyles,
            {backgroundColor: backgroundColor},
          ]}>
          <View style={{...styles.line, backgroundColor: lineColor}} />
          {children}
        </Animated.View>
      </GestureDetector>
    );
  },
);

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: SCREEN_HEIGHT,
    width: '100%',
    top: SCREEN_HEIGHT,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 20,
  },
  line: {
    height: 4,
    width: '40%',
    alignSelf: 'center',
    marginVertical: 20,
    borderRadius: 5,
  },
});
