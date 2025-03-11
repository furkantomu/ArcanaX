import React, {useEffect} from 'react';
import {Text} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

import {useNumerologyContext} from '../NumerologyContext';

import {getStyles} from '../styles';
import {useNavigation} from '@react-navigation/native';
import {SIZES} from '@/styles/theme';
import {Loading, Successful} from 'components';
import i18n from '@/i18n';
import {useAppSelector} from '@/hooks';

const SPRING_CONFIG = {
  damping: 40,
  stiffness: 400,
};

const AnimatedLoading = () => {
  const {height, isCalculate, setCalculate, numerologyDetail} =
    useNumerologyContext();
  const {localeValue} = useAppSelector(state => state.settings);
  const loading = useSharedValue(1);
  const navigation = useNavigation();

  useDerivedValue(
    () =>
      isCalculate &&
      withTiming(0, {duration: 5000}, () => {
        runOnJS(setCalculate)(false);
        runOnJS(navigation.navigate)('NumerologyDetailScreen', {
          numerologyDetail,
        });
      }),
  );

  const styles = getStyles();

  const containerStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });

  const displayStyle = useAnimatedStyle(() => {
    return {
      display: loading.value === 0 ? 'flex' : 'none',
    };
  });
  const displayCalculateStyle = useAnimatedStyle(() => {
    return {
      display: loading.value === 0 ? 'none' : 'flex',
    };
  });

  useEffect(() => {
    if (isCalculate) {
      height.value = withSpring(SIZES.height, {damping: 20, stiffness: 80});
      loading.value = withTiming(0, {duration: 2000});
    } else {
      height.value = withSpring(0, SPRING_CONFIG);
      loading.value = 1;
    }
  }, [height, isCalculate, loading, setCalculate]);
  return (
    <Animated.View style={[styles.animatedCalculateBtn, containerStyle]}>
      {isCalculate && (
        <>
          <Animated.View style={displayStyle}>
            <Successful style={styles.animated} />
            <Text style={styles.calculateText}>
              {i18n.t('NUMEROLOGY_SCREEN.LOADING.CALCULATED', {
                locale: localeValue,
              })}
            </Text>
          </Animated.View>

          <Animated.View style={displayCalculateStyle}>
            <Loading style={styles.animated} />
            <Text style={styles.calculateText}>
              {i18n.t('NUMEROLOGY_SCREEN.LOADING.CALCULATING', {
                locale: localeValue,
              })}
            </Text>
          </Animated.View>
        </>
      )}
    </Animated.View>
  );
};

export default AnimatedLoading;
