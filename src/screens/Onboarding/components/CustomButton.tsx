import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  AnimatedRef,
  SharedValue,
  interpolateColor,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {Icon} from '@/components';
import {OnboardingData} from '../data';
import {COLORS} from '@/styles/theme';
import {useHaptic, useScaleAnimation} from '@/utils';
import {useNavigation} from '@react-navigation/native';
import i18n from '@/i18n';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {setOnboardingCompleted} from '@/store/settings/settingsSlice';
import {useOnboardingContext} from '../OnboardingContext';
import {authActions} from '@/store/auth/authActions';
import {useSelector} from 'react-redux';

type Props = {
  dataLength: number;
  flatListIndex: SharedValue<number>;
  flatListRef: AnimatedRef<FlatList<OnboardingData>>;
  x: SharedValue<number>;
};

function CustomButton({flatListRef, flatListIndex, dataLength, x}: Props) {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {localeValue} = useAppSelector(state => state.settings);
  const {uiFlags} = useSelector((state: any) => state.auth);

  const {isScrollEnabled, contextErrors, fullName, email, birthdate, password} =
    useOnboardingContext();

  const {width: SCREEN_WIDTH} = useWindowDimensions();
  const haptic = useHaptic('soft');
  const {handlers, animatedStyle} = useScaleAnimation();

  const buttonAnimationStyle = useAnimatedStyle(() => ({
    width:
      flatListIndex.value === dataLength - 1 ? withSpring(140) : withSpring(60),
    height: 60,
  }));

  const arrowAnimationStyle = useAnimatedStyle(() => ({
    width: 30,
    height: 30,
    opacity:
      flatListIndex.value === dataLength - 1 ? withTiming(0) : withTiming(1),
    transform: [
      {
        translateX:
          flatListIndex.value === dataLength - 1
            ? withTiming(100)
            : withTiming(0),
      },
    ],
  }));

  const textAnimationStyle = useAnimatedStyle(() => ({
    opacity:
      flatListIndex.value === dataLength - 1 ? withTiming(1) : withTiming(0),
    transform: [
      {
        translateX:
          flatListIndex.value === dataLength - 1
            ? withTiming(0)
            : withTiming(-100),
      },
    ],
  }));
  const animatedColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      x.value,
      [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
      ['#e586af76', COLORS.cream, COLORS.silverGray],
    );

    return {
      backgroundColor,
    };
  });

  const handlePress = async () => {
    if (!isScrollEnabled) return;
    if (contextErrors) return;

    if (flatListIndex.value < dataLength - 1) {
      flatListRef.current?.scrollToIndex({
        index: flatListIndex.value + 1,
      });
    } else {
      const data = {
        name: fullName,
        email: email.toLowerCase(),
        birthDate: `${birthdate.day || '11'}-${birthdate.month || '11'}-${
          birthdate.year || '2011'
        }`,
        password: password,
        gender: '',
      };
      const response = await dispatch(authActions.register(data)).unwrap();
      if (response.status === 409) {
        return;
      }
      dispatch(setOnboardingCompleted());
    }
    haptic?.();
  };
  return (
    <TouchableWithoutFeedback
      onPress={handlePress}
      {...handlers}
      disabled={uiFlags.isLoggingIn}>
      <Animated.View
        style={[
          styles.container,
          buttonAnimationStyle,
          animatedColor,
          animatedStyle,
        ]}>
        <Animated.Text style={[styles.textButton, textAnimationStyle]}>
          {uiFlags.isLoggingIn ? (
            <ActivityIndicator color={COLORS.cream} />
          ) : (
            i18n.t('ONBOARDING.BUTTON', {locale: localeValue})
          )}
        </Animated.Text>
        <Animated.View style={[styles.iconContainer, arrowAnimationStyle]}>
          <Icon name="rightArrow" size={40} style={styles.arrow} />
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e2169',
    padding: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  arrow: {
    position: 'absolute',
    tintColor: 'white',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {color: 'white', fontSize: 16, position: 'absolute'},
});
