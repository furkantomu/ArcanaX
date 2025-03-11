import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {getStyles} from '../styles';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {Icon, Typography} from '@/components';
import i18n from '@/i18n';
import {useAppSelector} from '@/hooks';

const AnimatedContent = () => {
  const {localeValue} = useAppSelector(state => state.settings);
  const styles = getStyles();
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);
  const scale = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(200, withTiming(1, {duration: 800}));
    translateY.value = withDelay(
      200,
      withSpring(0, {damping: 12, stiffness: 100}),
    );
    scale.value = withDelay(200, withSpring(1, {damping: 10, stiffness: 100}));
  }, [opacity, scale, translateY]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{translateY: translateY.value}, {scale: scale.value}],
    };
  });
  return (
    <>
      <View style={styles.card}>
        <Animated.View style={[animatedStyle]}>
          <View>
            <View style={styles.cardContainer}>
              <View style={styles.row}>
                <View>
                  <Text style={styles.cardTitle}>
                    {i18n.t('DREAM_SCREEN.WARNING.CLUE_TITLE', {
                      locale: localeValue,
                    })}
                  </Text>
                </View>
              </View>
              <Icon name={'rightArrow'} />
            </View>
            <Text style={styles.cardDescription}>
              <Typography weight="NotoSerifCondensedThin">
                {' '}
                {i18n.t('DREAM_SCREEN.WARNING.TITLE', {locale: localeValue})}:
              </Typography>{' '}
              {i18n.t('DREAM_SCREEN.WARNING.CLUE_DESCRIPTION', {
                locale: localeValue,
              })}
            </Text>
          </View>
        </Animated.View>
      </View>

      <View style={styles.card}>
        <Animated.View style={[animatedStyle]}>
          <View>
            <View style={styles.cardContainer}>
              <View style={styles.row}>
                <View>
                  <Text style={styles.cardTitle}>
                    {i18n.t('DREAM_SCREEN.WARNING.RULES_TITLE', {
                      locale: localeValue,
                    })}
                  </Text>
                </View>
              </View>
              <Icon name={'rightArrow'} />
            </View>
            <Text style={styles.cardDescription}>
              <Typography weight="NotoSerifCondensedThin">
                {i18n.t('DREAM_SCREEN.WARNING.TITLE', {locale: localeValue})}:
              </Typography>{' '}
              {i18n.t('DREAM_SCREEN.WARNING.RULES_DESCRIPTION', {
                locale: localeValue,
              })}
            </Text>
          </View>
        </Animated.View>
      </View>
    </>
  );
};

export default AnimatedContent;
