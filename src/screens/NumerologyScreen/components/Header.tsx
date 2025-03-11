import React, {useEffect} from 'react';
import {View} from 'react-native';
import Animated, {
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {getStyles} from '../styles';
import i18n from '@/i18n';
import {useAppSelector} from '@/hooks';

const DURATION = 1000;
const DELAY = 500;

const Header = () => {
  const {localeValue} = useAppSelector(state => state.settings);
  const opacity1 = useSharedValue<number>(0);
  const opacity2 = useSharedValue<number>(0);
  const opacity3 = useSharedValue<number>(0);

  const text = [
    i18n.t('NUMEROLOGY_SCREEN.TITLE', {locale: localeValue}),
    i18n.t('NUMEROLOGY_SCREEN.TITLE_TWO', {locale: localeValue}),
    i18n.t('NUMEROLOGY_SCREEN.TITLE_THREE', {locale: localeValue}),
  ];

  const styles = getStyles();

  useEffect(() => {
    opacity3.value = withDelay(2 * DELAY, withTiming(1, {duration: DURATION}));
    opacity2.value = withDelay(1 * DELAY, withTiming(1, {duration: DURATION}));
    opacity1.value = withDelay(0 * DELAY, withTiming(1, {duration: DURATION}));
  }, [opacity1, opacity2, opacity3]);

  return (
    <View style={styles.header}>
      <Animated.Text style={[styles.headerText, {opacity: opacity1}]}>
        {text[0]}
      </Animated.Text>
      <Animated.Text style={[styles.headerText, {opacity: opacity2}]}>
        {text[1]}
      </Animated.Text>
      <Animated.Text style={[styles.headerText, {opacity: opacity3}]}>
        {text[2]}
      </Animated.Text>
    </View>
  );
};

export default Header;
