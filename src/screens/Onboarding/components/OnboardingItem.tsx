import React from 'react';
import {StyleSheet, View, useWindowDimensions, Image} from 'react-native';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { IconButton, Typography} from '@/components';
import i18n from '@/i18n';

import {OnboardingData} from '../data';
import {COLORS} from '@/styles/theme';
import {useAppSelector} from '@/hooks';
import FullName from './FullName';
import Birthdate from './Birthdate';
import Email from './Email';
import Password from './Password';

type Props = {
  index: number;
  x: SharedValue<number>;
  item: OnboardingData;
  openSheet: () => void;
};

function RenderItem({index, x, item, openSheet}: Props) {
  const {width: SCREEN_WIDTH} = useWindowDimensions();
  const {localeValue} = useAppSelector(state => state.settings);

  const lottieAnimationStyle = useAnimatedStyle(() => {
    const translateYAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [200, 0, -200],
      Extrapolation.CLAMP,
    );

    return {
      transform: [{translateY: translateYAnimation}],
    };
  });

  const circleAnimation = useAnimatedStyle(() => {
    const scale = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [1, 4, 4],
      Extrapolation.CLAMP,
    );

    return {
      transform: [{scale}],
    };
  });
  return (
    <View style={[styles.itemContainer, {width: SCREEN_WIDTH}]}>
      <View style={styles.circleContainer}>
        <Animated.View
          style={[
            {
              width: SCREEN_WIDTH,
              height: SCREEN_WIDTH,
              borderRadius: SCREEN_WIDTH / 2,
              backgroundColor: item.backgroundColor,
            },
            circleAnimation,
          ]}
        />
      </View>

      <LinearGradient
        colors={[COLORS.black, COLORS.blackOpacity, COLORS.black]}
        style={styles.linearGradient}
      />
      <Animated.Image
        source={item.image}
        resizeMode={'cover'}
        style={[styles.image, lottieAnimationStyle]}
      />
      <View style={styles.logoContainer}>
        <View style={styles.translateButton} />
        <Image
          source={require('../../../../assets/logo/logo.png')}
          style={styles.logo}
          resizeMode={'contain'}
        />
        <IconButton
          text=""
          iconName="translate"
          buttonStyle={styles.translateButton}
          iconStyle={styles.translateButtonIcon}
          iconSize={25}
          handlePress={openSheet}
        />
      </View>

      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          ...styles.content,
          backgroundColor:
            item.id === 1
              ? '#ad6f8aee'
              : item.id === 2
              ? '#f5f5dcc9'
              : item.id === 3
              ? '#c0c0c0cd'
              : '#c0c0c0cd',
        }}>
        <Typography
          style={{...styles.itemText, color: item.textColor}}
          size={'title'}
          weight={'NotoSerifCondensedBoldItalic'}>
          {i18n.t(`ONBOARDING.ITEM.${index}.text`, {locale: localeValue})}
        </Typography>
        <Animated.View
          style={[styles.descriptionContainer, lottieAnimationStyle]}>
          <Typography
            weight={'regular'}
            size={'large'}
            style={{...styles.itemDescription, color: item.textColor}}>
            {i18n.t(`ONBOARDING.ITEM.${index}.description`, {
              locale: localeValue,
            })}
          </Typography>
        </Animated.View>
        {item.type === 'email' && <Email />}
        {item.type === 'fullName' && <FullName />}
        {item.type === 'password' && <Password />}
      </View>
    </View>
  );
}

export default RenderItem;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: -1,
  },
  linearGradient: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 0,
  },
  logoContainer: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 3,
    position: 'absolute',
    flexDirection: 'row',
    top: 65,
  },
  logo: {
    height: 30,
    width: 120,
  },
  translateButton: {
    backgroundColor: 'transparent',
    right: 10,
    width: 50,
    zIndex: 99,
  },
  translateButtonIcon: {
    tintColor: COLORS.cream,
  },
  content: {
    gap: 30,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  itemText: {
    textAlign: 'left',
    marginHorizontal: 20,
  },
  descriptionContainer: {
    marginHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
  },
  itemDescription: {
    textAlign: 'left',
  },
  circleContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
