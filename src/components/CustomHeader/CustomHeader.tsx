import {useRefsContext} from '@/context';
import { useAppSelector } from '@/hooks';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet} from 'react-native';

import {COLORS, SIZES} from 'styles/theme';
import {IconButton} from '../button/IconButton';
import Typography from '../Typography/Typography';

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
  const {tokenSheetRef} = useRefsContext();
  const {balance} = useAppSelector(state => state.balance);

  const openModal = () => {
    tokenSheetRef.current?.scrollTo(-SIZES.height / 2);
  };

  // const closeModal = () => {
  //   tokenSheetRef.current?.scrollTo(0);
  // };

  return (
    <View style={styles.headerContainer}>
      {/* Left Icon */}
      {leftIcon ? (
        <IconButton
          handlePress={() => navigation.goBack()}
          iconName={'left'}
          iconStyle={styles.icon}
          iconSize={25}
          text={'Geri'}
          buttonStyle={styles.iconContainer}
          variant={'secondary'}
        />
      ) : (
        <View style={styles.iconContainer} />
      )}

      {/* Title */}
      <Typography size="large">{title ? 'ArcanaX' : ''}</Typography>

      {/* Right Icons */}
      <View style={styles.rightIconsContainer}>
        {rightIcon && (
          <IconButton
            handlePress={() => openModal()}
            iconName={'token'}
            iconStyle={styles.tokenIcon}
            iconSize={25}
            text={String(balance?.totalBalance)}
            buttonStyle={styles.iconContainer}
            variant={'secondary'}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    width: SIZES.width,
    height: 50,
    top: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.blackOpacity,
    paddingHorizontal: 15,
    zIndex: 99,
    // iOS shadow
    shadowColor: COLORS.gold,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.4,
    shadowRadius: 6,
    // Android shadow
    elevation: 5,
  },
  iconContainer: {
    backgroundColor: 'transparent',
    width: 80,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 13,
    paddingLeft: 0,
    paddingRight: 0,
    gap: 2,
    color: COLORS.cream,
  },
  icon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    tintColor: COLORS.cream,
  },
  tokenIcon: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
  rightIconsContainer: {
    flexDirection: 'row',
  },
});

export default CustomHeader;
