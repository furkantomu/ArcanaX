import {Button, Icon, Typography} from '@/components';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

import React, {useEffect, useState} from 'react';
import {View, Alert} from 'react-native';

import {getStyles} from '../styles';
import i18n from '@/i18n';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {SIZES} from '@/styles/theme';
import {useRefsContext} from '@/context';
import {balanceActions} from '@/store/balance/balanceActions';
import {apiService} from '@/services/APIService';

type NumerologyDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'NumerologyDetailScreen'
>;

const Footer = () => {
  const route = useRoute<NumerologyDetailScreenRouteProp>();
  const {localeValue} = useAppSelector(state => state.settings);
  const {user} = useAppSelector(state => state.auth);
  const {numerologyDetail} = route.params;
  const dispatch = useAppDispatch();
  const styles = getStyles();
  const navigation = useNavigation();
  const [numerologyPrice, setNumerologyPrice] = useState({
    status: 'active',
    price: 100,
  });
  const getNumerologyPrice = async () => {
    try {
      const response = await apiService.get(`numerology/numerology-price`);
      setNumerologyPrice({
        status: response.data.status,
        price: response.data.price,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNumerologyPrice();
  }, []);

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
            disabled={numerologyPrice.status === 'active' ? false : true}
            buttonStyle={styles.priceButton}
            textStyle={styles.priceButtonText}
            handlePress={async () => {
              const {balance} = await dispatch(
                balanceActions.getBalance({accountId: String(user?.accountId)}),
              ).unwrap();
              await getNumerologyPrice();
              if (Number(balance.totalBalance) < numerologyPrice.price) {
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
                      onPress: () => navigation.navigate('PurchasingScreen'),
                    },
                  ],
                );
                return;
              }
              const data = {
                userId: String(user?.id),
                accountId: String(user?.accountId),
                balance: Number(-numerologyPrice.price),
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
            <Typography size="heading">{numerologyPrice.price}</Typography>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Footer;
