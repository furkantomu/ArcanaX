import React, {useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {View} from 'react-native';

import {Typography} from '@/components';

import {COLORS} from '@/styles/theme';
import {getStyles} from '../styles';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';
import i18n from '@/i18n';
import { useAppSelector } from '@/hooks';

const Header = () => {
  const {localeValue} = useAppSelector(state => state.settings);
  const styles = getStyles();

  const translateY = useSharedValue(50);
  const scale = useSharedValue(0.8);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}, {scale: scale.value}],
    };
  });

  useEffect(() => {
    translateY.value = withDelay(
      200, // Her kart için gecikme
      withSpring(0, {damping: 12, stiffness: 100}), // Yukarı kaydırma
    );
    scale.value = withDelay(
      200, // Her kart için gecikme
      withSpring(1, {damping: 10, stiffness: 100}), // Yukarı kaydırma
    );
  }, [scale, translateY]);

  return (
    <View>
      <Animated.Image
        source={require('../../../../assets/background/dream.webp')}
        style={[styles.ImageBackground, animatedStyle]}
        resizeMode={'contain'}
      />
      <LinearGradient
        colors={[COLORS.black, COLORS.blackOpacity, COLORS.black]}
        style={styles.linearGradient}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}
        locations={[1, 0.5, 0.04]}
      />
      <View style={styles.headerTextWrapper}>
        <Typography weight={'NotoSerifCondensedMediumItalic'} size={'heading'}>
          {i18n.t('DREAM_PREMIUM_SCREEN.TITLE', {locale: localeValue})}
        </Typography>
      </View>
    </View>
  );
};

export default Header;
