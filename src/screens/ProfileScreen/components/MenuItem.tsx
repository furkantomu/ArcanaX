import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';

import {Icon, Typography} from '@/components';

import {logout} from '@/store/auth/authSlice';
import {useAppDispatch, useAppSelector} from '@/hooks';

import {useHaptic, useScaleAnimation} from '@/utils';
import {getStyles} from '../styles';
import i18n from '@/i18n';

const MenuItem = ({leftIcon, title, rightIcon, type, index}) => {
  const dispatch = useAppDispatch();
  const {localeValue} = useAppSelector(state => state.settings);
  const navigation = useNavigation();
  const styles = getStyles();
  const {handlers, animatedStyle} = useScaleAnimation();
  const haptic = useHaptic('soft');

  const handlePress = (buttonType: string) => {
    haptic?.();
    if (buttonType === 'logout') {
      dispatch(logout());
    }
    if (buttonType === 'password') {
      navigation.navigate('ProfilePasswordScreen');
    }
    if (buttonType === 'history') {
      navigation.navigate('SaveServicesScreen');
    }
    if (buttonType === 'token') {
      navigation.navigate('BalanceScreen');
    }
    if (buttonType === 'info') {
      navigation.navigate('FAQScreen');
    }
    if (buttonType === 'accountSettings') {
      navigation.navigate('AccountSettings');
    }
  };
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => handlePress(type)}
      {...handlers}>
      <Animated.View style={[styles.menuItem, animatedStyle]}>
        <View style={styles.leftWrapper}>
          <Icon name={leftIcon} size={20} style={styles.leftIcon} />
        </View>
        <View
          style={[styles.rightWrapper, {borderTopWidth: index === 0 ? 0 : 1}]}>
          <Typography size="large">
            {i18n.t(`PROFILE_SCREEN.${title}`, {locale: localeValue})}
          </Typography>
          <Icon name={rightIcon} size={20} style={styles.rightIcon} />
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default MenuItem;
