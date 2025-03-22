import {useRefsContext} from '@/context';
import {useAppSelector} from '@/hooks';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';

import {COLORS, SIZES} from 'styles/theme';
import {IconButton} from '../button/IconButton';
import Typography from '../Typography/Typography';
import i18n from '@/i18n';
import Icon from '../Icon';
import {useHaptic} from '@/utils';

interface CustomHeaderProps {
  leftIcon?: boolean; // Prop to show left icon
  rightIcon?: boolean; // Prop to show right icon
  title?: boolean; // Prop to display the title
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  leftIcon,
  rightIcon,
  title,
}) => {
  const navigation = useNavigation();
  const {purchasingSheetRef} = useRefsContext();
  const {balance} = useAppSelector(state => state.balance);
  const {localeValue} = useAppSelector(state => state.settings);
  const haptic = useHaptic('soft');
  const openModal = () => {
    purchasingSheetRef.current?.scrollTo(-SIZES.height / 1.2);
  };

  // const closeModal = () => {
  //   purchasingSheetRef.current?.scrollTo(0);
  // };

  return (
    <View style={styles.headerContainer}>
      {/* Left Icon */}
      {leftIcon ? (
        <Pressable
          style={styles.leftIcon}
          onPress={() => {
            haptic?.();
            navigation.goBack();
          }}>
          <Icon name="left" style={styles.icon} />
          <Typography size="large" style={styles.iconContainer}>
            {i18n.t('NAVIGATION_BACK', {locale: localeValue})}
          </Typography>
        </Pressable>
      ) : (
        <View style={styles.iconContainer} />
      )}

      {/* Title */}
      <Typography size="large">{title ? 'ArcanaX' : ''}</Typography>

      {/* Right Icons */}
      <View style={styles.rightIconsContainer}>
        {rightIcon ? (
          <View>
            <Pressable
              onPress={() => {
                haptic?.();
                openModal();
              }}
              style={styles.iconContainer}>
              <Icon name="token" style={styles.tokenIcon} />
              <Typography size="large">{balance?.totalBalance}</Typography>
            </Pressable>
          </View>
        ) : (
          <View style={styles.iconContainer} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    top: 0,
    width: SIZES.width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.blackOpacity,
    zIndex: 99,
    // iOS shadow
    shadowColor: COLORS.gold,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 6,
    // Android shadow
    elevation: 0.5,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  iconContainer: {
    width: 60,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    borderRadius: 13,
    color: COLORS.cream,
  },
  icon: {
    width: 25,
    height: 25,
    resizeMode: 'cover',
    tintColor: COLORS.cream,
  },
  tokenIcon: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
  },
  rightIconsContainer: {
    flexDirection: 'row',

  },
  leftIcon: {
     flexDirection: 'row',
     justifyContent:'center',
     alignItems:'center',
  },
});

export default CustomHeader;
