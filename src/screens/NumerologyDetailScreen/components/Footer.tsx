import {Button, Icon, IconButton, Typography} from '@/components';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

import React from 'react';
import {View, Alert} from 'react-native';

import {getStyles} from '../styles';
import i18n from '@/i18n';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {SIZES} from '@/styles/theme';
import {useRefsContext} from '@/context';
import {balanceActions} from '@/store/balance/balanceActions';

type NumerologyDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'NumerologyDetailScreen'
>;

const Footer = () => {
  const route = useRoute<NumerologyDetailScreenRouteProp>();
  const {localeValue} = useAppSelector(state => state.settings);
  const {user} = useAppSelector(state => state.auth);
  const {purchasingSheetRef} = useRefsContext();
  const {numerologyDetail} = route.params;
  const dispatch = useAppDispatch();
  const styles = getStyles();
  const navigation = useNavigation();

  return (
    <View style={styles.footer}>
      <View style={styles.footerWrapper}>
        <Typography size="large" style={styles.description}>
          <Typography
            size="large"
            weight="NotoSerifCondensedBoldItalic"
            style={styles.description}>
            {numerologyDetail.name}:{' '}
          </Typography>{' '}
          {i18n.t('NUMEROLOGY_DETAIL_SCREEN.DESCRIPTION', {
            locale: localeValue,
          })}
        </Typography>
        <Typography style={styles.description}>
          {i18n.t(`LIFE_PATH_DETAIL.${[numerologyDetail.lifePath]}`, {
            locale: localeValue,
          })}
        </Typography>

        <View>
          <Button
            text={i18n.t('NUMEROLOGY_DETAIL_SCREEN.BUTTON_TEXT', {
              locale: localeValue,
            })}
            variant={'secondary'}
            buttonStyle={styles.priceButton}
            textStyle={styles.priceButtonText}
            handlePress={async () => {
              const {balance} = await dispatch(
                  balanceActions.getBalance({accountId: String(user?.accountId)}),
                ).unwrap();
              if (Number(balance.totalBalance) < 100) {
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
                        purchasingSheetRef.current?.scrollTo(
                          -SIZES.height / 1.2,
                        ),
                    },
                  ],
                );
                return;
              }
              const data = {
                userId: user.id,
                accountId: user.accountId,
                balance: Number(-route.params.price),
                amount: 0,
                transactionId: '',
                appTransactionId: '',
                originalTransactionId: '',
                storefrontId: '',
                productId: '',
              };
              await dispatch(balanceActions.addBalance(data));
              navigation.navigate('NumerologyPremiumScreen', {
                numerologyDetail,
              });
            }}
          />
          <View style={styles.priceInfo}>
            <Icon name="token" style={styles.tokenIcon} />
            <Typography size="heading">100</Typography>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Footer;
