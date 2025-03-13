import {Alert, View} from 'react-native';
import React, {useEffect} from 'react';
import {getStyles} from '../styles';
import {Icon, IconButton, Typography} from '@/components';
import {useNavigation} from '@react-navigation/native';
import i18n from '@/i18n';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {useRefsContext} from '@/context';
import {SIZES} from '@/styles/theme';
import {balanceActions} from '@/store/balance/balanceActions';

const FooterButton = () => {
  const styles = getStyles();
  const navigation = useNavigation();
  const {localeValue} = useAppSelector(state => state.settings);
  const {user} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const {purchasingSheetRef} = useRefsContext();

  const handlePress = async () => {
    const {balance} = await dispatch(
      balanceActions.getBalance({accountId: String(user?.accountId)}),
    ).unwrap();
    if (Number(balance.totalBalance) < 10) {
      Alert.alert(
        i18n.t('BALANCE_CONTROL.TITLE', {
          locale: localeValue,
        }),
        i18n.t('BALANCE_CONTROL.DESCRIPTION', {
          locale: localeValue,
        }),
        [
          {
            text: i18n.t('BALANCE_CONTROL.CANCEL', {
              locale: localeValue,
            }),
            style: 'cancel',
          },
          {
            text: i18n.t('BALANCE_CONTROL.BUY', {
              locale: localeValue,
            }),
            onPress: () =>
              purchasingSheetRef.current?.scrollTo(-SIZES.height / 1.2),
          },
        ],
      );
      return;
    }
    navigation.navigate('DreamPremiumScreen');
  };
  return (
    <View style={styles.footerWrapper}>
      <IconButton
        iconName={'diamond'}
        iconSize={40}
        text={i18n.t('DREAM_SCREEN.BUTTON_TEXT', {locale: localeValue})}
        buttonStyle={styles.footerButton}
        handlePress={handlePress}
      />
      <View style={styles.priceInfo}>
        <Icon name="token" style={styles.tokenIcon} />
        <Typography size="heading">10</Typography>
      </View>
    </View>
  );
};

export default FooterButton;
