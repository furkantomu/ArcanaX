import {useRefsContext} from '@/context';
import {useAppSelector} from '@/hooks';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, Pressable, Platform} from 'react-native';

import {COLORS, SIZES} from 'styles/theme';
import Typography from '../Typography/Typography';
import i18n from '@/i18n';
import Icon from '../Icon';
import {useHaptic} from '@/utils';
import {
  flushFailedPurchasesCachedAsPendingAndroid,
  initConnection,
  PurchaseError,
} from 'react-native-iap';

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
  const openModal = async () => {
    try {
      await initConnection();

      Platform.OS === 'android' &&
        (await flushFailedPurchasesCachedAsPendingAndroid());
    } catch (error) {
      if (error instanceof PurchaseError) {
        console.log({message: `[${error.code}]: ${error.message}`, error});
      } else {
        console.log({message: 'finishTransaction', error});
      }
    }
    purchasingSheetRef.current?.scrollTo(-SIZES.height / 1.2);
  };

  // const closeModal = () => {
  //   purchasingSheetRef.current?.scrollTo(0);
  // };

  return (
    <View style={styles.headerContainer}>
      {/* Sol alan */}
      <View style={styles.sideContainer}>
        {leftIcon ? (
          <Pressable
            style={styles.leftIcon}
            onPress={() => {
              haptic?.();
              navigation.goBack();
            }}>
            <Icon name="left" style={styles.icon} />
            <Typography size="large" style={styles.backText}>
              {i18n.t('NAVIGATION_BACK', {locale: localeValue})}
            </Typography>
          </Pressable>
        ) : null}
      </View>

      {/* Orta başlık */}
      <View style={styles.centerContainer}>
        {title && (
          <Typography size="large" style={styles.title}>
            ArcanaX
          </Typography>
        )}
      </View>

      {/* Sağ alan */}
      <View style={styles.sideContainer}>
        {rightIcon ? (
          <Pressable
            onPress={() => {
              haptic?.();
              openModal();
            }}
            style={styles.iconContainer}>
            <Icon name="token" style={styles.tokenIcon} />
            <Typography size="large">{balance?.totalBalance}</Typography>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: SIZES.width,
    paddingHorizontal: 0,
    paddingVertical: 15,
    backgroundColor: COLORS.blackOpacity,
    shadowColor: COLORS.gold,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 0.5,
    zIndex: 99,
  },

  sideContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },

  centerContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    color: COLORS.cream,
    fontWeight: 'bold',
  },

  backText: {
    color: COLORS.cream,
    marginLeft: 5,
  },

  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
    color: COLORS.cream,
    gap: 5,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomHeader;
