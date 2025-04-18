import {SIZES} from '@/styles/theme';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, Pressable} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  Gesture,
  GestureDetector,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  FadeIn,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {useMyTarotReadingContext} from '../MyTarotReadingContext';
import {Button} from '@/components';

const {width, height} = Dimensions.get('window');

const aspectRatio = 722 / 368;
export const CARD_WIDTH = width - 218;
export const CARD_HEIGHT = CARD_WIDTH * aspectRatio;
const IMAGE_WIDTH = CARD_WIDTH * 0.9;
const DURATION = 250;
const side = (width + CARD_WIDTH) / 2;
const SNAP_POINTS = [-side, 0, side];

interface CardProps {
  card: {
    frontImageSource: ReturnType<typeof require>;
    id: string;
    name: string;
    engName: string;
    category: 'swords' | 'wands' | 'cups' | 'pentacles' | 'major';
  };
  index: number;
  shuflleback: Animated.SharedValue<boolean>;
  onSelect?: (id: string, name: string, engName: string) => void;
}

// snapPoint alternatifi
const getSnapPoint = (
  value: number,
  velocity: number,
  points: number[],
): number => {
  'worklet';
  const predicted = value + 0.2 * velocity;
  return points.reduce((prev, curr) =>
    Math.abs(curr - predicted) < Math.abs(prev - predicted) ? curr : prev,
  );
};

export const Card = ({
  card: {frontImageSource, id, name, engName, category},
  index,
  shuflleback,
  onSelect,
}: CardProps) => {
  const {
    handleSelectCard,
    handleRemoveCard,
    selectedCards,
    lastRemovedCard,
    setLastRemovedCard,
  } = useMyTarotReadingContext();
  const x = useSharedValue(0);
  const y = useSharedValue(-height);
  const context = useSharedValue({
    y: 0,
    x: 0,
  });
  const theta = Math.random() * 20 - 10;
  const rotateZ = useSharedValue(0);
  const scale = useSharedValue(1);
  const progress = useDerivedValue(() =>
    withTiming(selectedCards.length, {duration: 100}),
  );

  useAnimatedReaction(
    () => shuflleback.value,
    () => {
      if (shuflleback.value) {
        const delay = 150 * index;
        x.value = withDelay(delay, withSpring(0));
        rotateZ.value = withDelay(
          delay,
          withSpring(theta, {}, () => {
            shuflleback.value = false;
          }),
        );
      }
    },
  );

  useEffect(() => {
    const delay = 1000 + index * DURATION;
    y.value = withDelay(
      delay,
      withTiming(0, {
        duration: DURATION,
        easing: Easing.inOut(Easing.ease),
      }),
    );
    rotateZ.value = withDelay(
      delay,
      withTiming(theta, {
        duration: DURATION,
        easing: Easing.inOut(Easing.ease),
      }),
    );
  }, [index]);
  useEffect(() => {
    if (lastRemovedCard?.id === id) {
      x.value = withSpring(0);
      y.value = withSpring(0);
      setLastRemovedCard(null);
    }
  }, [lastRemovedCard]);
  const gesture = Gesture.Pan()
    .onStart(event => {
      context.value.x = x.value;
      context.value.y = y.value;
      scale.value = withTiming(1.1, {
        easing: Easing.inOut(Easing.ease),
      });
      rotateZ.value = withTiming(0, {
        easing: Easing.inOut(Easing.ease),
      });
    })
    .onUpdate(event => {
      x.value = context.value.x + event.translationX;
      y.value = context.value.y + event.translationY;
    })
    .onEnd(event => {
      const dest = getSnapPoint(x.value, event.velocityX, SNAP_POINTS);
      if (event.translationX > 0 && progress.value >= 5) {
        x.value = withSpring(0, {velocity: event.velocityX});
        y.value = withSpring(0, {velocity: event.velocityY});
        return;
      }
      if (dest > 0) {
        runOnJS(handleSelectCard)({
          frontImageSource,
          id,
          name,
          engName,
          category,
        });
      } else {
        runOnJS(handleRemoveCard)({
          frontImageSource,
          id,
          name,
          engName,
          category,
        });
      }
      x.value = withSpring(dest, {velocity: event.velocityX});
      y.value = withSpring(0, {velocity: event.velocityY});
      scale.value = withTiming(1, {easing: Easing.inOut(Easing.ease)}, () => {
        if (index === 0 && dest !== 0) {
          shuflleback.value = true;
        }
      });
    });

  const style = useAnimatedStyle(() => ({
    transform: [
      {perspective: 1000},
      {rotateX: '20deg'},
      {rotateZ: `${rotateZ.value}deg`},
      {translateX: x.value},
      {translateY: y.value},
      {scale: scale.value},
    ],
  }));
  return (
    <View style={styles.container} pointerEvents="box-none">
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.card, style]}>
          <Pressable
            onPress={() => onSelect?.(id, name, engName)}
            style={{zIndex: 40}}>
            <FastImage
              style={{
                width: 280,
                height: IMAGE_WIDTH * aspectRatio,
                zIndex: 40,
              }}
              source={require('../../../../assets/card/back.webp')}
              resizeMode={FastImage.resizeMode.cover}
            />
          </Pressable>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 40,
    alignItems: 'center',
  },
  card: {
    borderRadius: 10,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 40,
  },
});
