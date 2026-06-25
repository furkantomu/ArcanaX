import React, { useEffect } from 'react';
import { View, TouchableOpacity, Pressable } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { getStyles } from '../style';
import { SIZES } from '@/styles/theme';
import { useHaptic } from '@/utils';
import { useRefsContext } from '@/context';
import { useTarotContext } from '../TarotContext';
import i18n from '@/i18n';
import { useAppSelector } from '@/hooks';

const FooterButtons = () => {
  const { selectCardSheetRef } = useRefsContext();
  const { localeValue } = useAppSelector(state => state.settings);
  const { fetchTarotCards, setSelectedCards } = useTarotContext();
  const haptic = useHaptic('soft');
  const styles = getStyles();
  const rightArrows = require('../../../../assets/icon/rightArrows.png');
  const triquetra = require('../../../../assets/icon/triquetra.png');

  const opacity = useSharedValue(0);
  const translateX = useSharedValue(-150);
  const translateY = useSharedValue(-20);
  const rotateZ = useSharedValue(0);

  const translateRightArrowX = useSharedValue(150);

  const scale = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(200, withTiming(1, { duration: 800 }));
    translateX.value = withDelay(
      200,
      withSpring(0, { damping: 12, stiffness: 100 }),
    );
    translateY.value = withDelay(
      200,
      withSpring(0, { damping: 12, stiffness: 100 }),
    );
    translateRightArrowX.value = withDelay(
      200,
      withSpring(0, { damping: 12, stiffness: 100 }),
    );
    scale.value = withDelay(200, withSpring(1, { damping: 10, stiffness: 100 }));
  }, [opacity, scale, translateX, translateRightArrowX, translateY]);

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { scale: scale.value }, // Scale animasyonunu ekledik
      ],
    };
  });

  const animatedTriquetraStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { translateY: translateY.value },
        { rotateZ: `${rotateZ.value}deg` },
      ],
    };
  });

  const animatedRightArrowStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { translateX: translateRightArrowX.value },
        { rotateZ: '180deg' },
        { scale: scale.value },
      ],
    };
  });

  const animatedLeftArrowStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateX: translateX.value }, { scale: scale.value }],
    };
  });

  const openModal = () => {
    fetchTarotCards();
    selectCardSheetRef.current?.present();
  };
  const handleStartSpread = async () => {
    setSelectedCards([]);
    translateX.value = withDelay(
      500,
      withSpring(-SIZES.width, { damping: 12, stiffness: 100 }),
    );
    translateRightArrowX.value = withDelay(
      500,
      withSpring(SIZES.width, { damping: 12, stiffness: 100 }, isFinished => {
        if (isFinished) {
          runOnJS(openModal)();
        }
      }),
    );
    rotateZ.value = withDelay(
      400,
      withSpring(540, { damping: 10, stiffness: 100 }),
    );
    haptic?.();
  };

  return (
    <View style={styles.buttons}>
      <Pressable onPress={handleStartSpread}>
        <Animated.Text style={[styles.subTitle, animatedTextStyle]}>
          {i18n.t('TAROT_READ_START.SELECT_BUTTON', { locale: localeValue })}
        </Animated.Text>
      </Pressable>
      <View style={styles.imageContainer}>
        <Animated.Image
          source={rightArrows}
          style={[styles.rightArrows, animatedLeftArrowStyle]}
        />
        <TouchableOpacity onPress={handleStartSpread}>
          <Animated.Image
            source={triquetra}
            style={[styles.triquetra, animatedTriquetraStyle]}
          />
        </TouchableOpacity>
        <Animated.Image
          source={rightArrows}
          style={[styles.leftArrows, animatedRightArrowStyle]}
        />
      </View>
    </View>
  );
};

export default FooterButtons;
