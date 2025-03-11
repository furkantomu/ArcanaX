import React, {useEffect} from 'react';
import {View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';

import {COLORS} from '@/styles/theme';

import {getStyles} from '../style';
import {Typography} from '@/components';
import i18n from '@/i18n';
import { useAppSelector } from '@/hooks';

const Header = ({route}) => {
  const {localeValue} = useAppSelector(state => state.settings);
  const styles = getStyles();

  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(
      200,
      withSpring(1, {damping: 12, stiffness: 100}),
    );
    scale.value = withDelay(300, withSpring(1, {damping: 12, stiffness: 100}));
  }, [opacity, scale]);

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{scale: scale.value}],
    };
  });
  return (
    <View style={styles.backgroundContent}>
      <Typography
        size={'title'}
        weight={'NotoSerifCondensedThin'}
        style={styles.title}>
        {route.params.name}
      </Typography>
      <Animated.View style={[styles.info, animatedTextStyle]}>
        <Typography size={'medium'} style={styles.infoTitle}>
          {i18n.t('TAROT_READ_START.TITLE', {locale: localeValue})}
        </Typography>
        <Typography
          size={'heading'}
          weight={'NotoSerifCondensedItalic'}
          style={{...styles.infoTitle, color: COLORS.gold}}>
          '{i18n.t('TAROT_READ_START.SUB_TITLE', {locale: localeValue})}'
        </Typography>
        <Typography size={'medium'} style={styles.infoTitle}>
        {i18n.t('TAROT_READ_START.BOTTOM_TITLE', {locale: localeValue})}
        </Typography>
      </Animated.View>
    </View>
  );
};

export default Header;
