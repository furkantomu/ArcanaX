import React, {useEffect} from 'react';
import {View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';

import {AnimatedTextField} from '@/components';

import {getStyles} from '../style';
import { useTarotContext } from '../TarotContext';

const Content = () => {
  const {setQuestion, question} = useTarotContext();
  const styles = getStyles();
  const cardBG = require('../../../../assets/card/back.webp');

  const opacity = useSharedValue(1);
  const cardTranslateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const rotateZRight = useSharedValue(0);
  const rotateZLeft = useSharedValue(0);
  const cardTranslateXLeft = useSharedValue(0);
  const cardTranslateXRight = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(
      500, // Her kart için gecikme
      withSpring(1, {damping: 12, stiffness: 100}), // Yukarı kaydırma
    );
    cardTranslateY.value = withDelay(
      500, // Her kart için gecikme
      withSpring(-30, {damping: 12, stiffness: 100}), // Yukarı kaydırma
    );
    cardTranslateXLeft.value = withDelay(
      500, // Her kart için gecikme
      withSpring(-30, {damping: 12, stiffness: 100}), // Yukarı kaydırma
    );
    cardTranslateXRight.value = withDelay(
      500, // Her kart için gecikme
      withSpring(30, {damping: 12, stiffness: 100}), // Yukarı kaydırma
    );

    rotateZRight.value = withDelay(
      400,
      withSpring(10, {damping: 10, stiffness: 100}),
    );
    rotateZLeft.value = withDelay(
      400,
      withSpring(-10, {damping: 10, stiffness: 100}),
    );
  }, [
    cardTranslateY,
    opacity,
    rotateZRight,
    rotateZLeft,
    cardTranslateXLeft,
    cardTranslateXRight,
  ]);

  useEffect(() => {
    scale.value = withDelay(
      600,
      withSpring(1, {damping: 12, stiffness: 100}),
    );
  }, [scale]);

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{scale: scale.value}],
    };
  });

  const animatedCardRightStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {rotateZ: `${rotateZRight.value}deg`},
        {translateX: cardTranslateXLeft.value},
      ],
    };
  });
  const animatedCardCenterStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: cardTranslateY.value}],
      zIndex: 10,
    };
  });
  const animatedCardLeftStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {rotateZ: `${rotateZLeft.value}deg`},
        {translateX: cardTranslateXRight.value},
      ],
    };
  });
  return (
    <Animated.View style={[styles.content, animatedTextStyle]}>
      <AnimatedTextField
        value={question}
        label="Hangi soruya cevap arıyorsun?"
        //errorText={error}
        onChangeText={text => setQuestion(text)}
        maxLength={50}
      />
      <View style={styles.cardBgContainer}>
        <Animated.Image
          source={cardBG}
          style={[styles.cardBg, animatedCardLeftStyle]}
          resizeMode={'cover'}
        />
        <Animated.Image
          source={cardBG}
          style={[styles.cardBg, animatedCardCenterStyle]}
          resizeMode={'cover'}
        />
        <Animated.Image
          source={cardBG}
          style={[styles.cardBg, animatedCardRightStyle]}
          resizeMode={'cover'}
        />
      </View>
    </Animated.View>
  );
};

export default Content;
