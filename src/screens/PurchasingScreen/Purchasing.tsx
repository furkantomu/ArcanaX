/* eslint-disable react/jsx-no-comment-textnodes */
import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Platform,
  Image,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import {
  isIosStorekit2,
  requestPurchase,
  useIAP,
  withIAPContext,
  Product,
  ProductPurchase,
} from 'react-native-iap';

import LinearGradient from 'react-native-linear-gradient';
import {COLORS, SIZES} from '@/styles/theme';

import i18n from '@/i18n';
import {useAppDispatch, useAppSelector} from '@/hooks';

import {balanceActions} from '@/store/balance/balanceActions';
import {showToast} from '@/utils/showToast';

import {apiService} from '@/services/APIService';
import {getStyles} from './styles';
import {Button, Icon, MyWebComponent, Typography} from '@/components';
import Advert from '@/components/Advert/Advert';
import {CardView} from './CardView';
import {useNavigation} from '@react-navigation/native';

const image = require('../../../assets/background/tokenBg.webp');

const productSkus = Platform.select({
  ios: [
    'arcanaX_app_token_25',
    'arcanaX_app_token_50',
    'arcanaX_app_token_75',
    'arcanaX_app_token_100',
    'arcanaX_app_token_200',
    'arcanaX_app_token_500',
    'arcanaX_app_token_1000',
  ],
  android: [
    'arcanax_app_token_25',
    'arcanax_app_token_50',
    'arcanax_app_token_75',
    'arcanax_app_token_100',
    'arcanax_app_token_200',
    'arcanax_app_token_500',
    'arcanax_app_token_1000',
  ],
  default: [],
}) as string[];

const Purchasing = () => {
  const styles = getStyles();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const {localeValue} = useAppSelector(state => state.settings);
  const {user} = useAppSelector(state => state.auth);
  const {balance} = useAppSelector(state => state.balance);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const {connected, products, currentPurchase, finishTransaction, getProducts} =
    useIAP();

  useEffect(() => {
    if (connected) {
      getProducts({skus: productSkus}).catch(error =>
        console.log({message: 'handleGetProducts', error}),
      );
    }
  }, [connected, getProducts]);

  useEffect(() => {
    const processPurchase = async () => {
      if (currentPurchase) {
        try {
          await finishTransaction({
            purchase: currentPurchase,
            isConsumable: true,
          });
        } catch (err) {
          console.warn('Satın alma tamamlanamadı:', err);
        }
      }
    };
    processPurchase();
  }, [currentPurchase, finishTransaction]);
  const handleBuyProduct = async () => {
    if (currentPurchase?.transactionId) {
      console.log('Zaten aktif bir satın alma var, yeni işlem başlatılmıyor.');
      return;
    }
    try {
      setLoading(true);
      if (Platform.OS === 'ios') {
        const response = (await requestPurchase({
          sku: selectedProduct?.productId ?? '',
        })) as ProductPurchase;

        const result = await apiService.post<{
          success: boolean;
          bonus: string;
        }>('/auth/verify-purchase', {
          transactionId: response.transactionId,
        });

        await dispatch(
          balanceActions.getBalance({accountId: String(user?.accountId)}),
        );
        showToast({
          message: i18n.t('ADD_BALANCE_SHEET.ADD', {
            bonus: result.data.bonus,
            locale: localeValue,
          }),
          type: 'success',
        });
      } else {
        const purchaseData = await requestPurchase({
          skus: [selectedProduct?.productId ?? ''],
        });
        const result = await apiService.post<{bonus: string}>(
          '/auth/verify-purchase-android',
          {
            purchaseData,
            selectedProduct,
          },
        );

        await dispatch(
          balanceActions.getBalance({accountId: String(user?.accountId)}),
        );
        showToast({
          message: i18n.t('ADD_BALANCE_SHEET.ADD', {
            bonus: result.data.bonus,
            locale: localeValue,
          }),
          type: 'success',
        });
      }
    } catch (error: any) {
      console.log(error.code);
      if (error.code !== 'E_USER_CANCELLED') {
        showToast({
          message:
            i18n.t('ADD_BALANCE_SHEET.ERROR', {locale: localeValue}) ?? '',
          type: 'error',
        });
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Pressable onPress={() => navigation.goBack()} style={styles.closeButton}>
          <Typography size="heading">X</Typography>
        </Pressable> */}
        <Button text='X' handlePress={() => navigation.goBack()} buttonStyle={styles.closeButton}/>
      </View>
      <LinearGradient
        colors={[COLORS.black, COLORS.blackOpacity1, COLORS.black]}
        style={styles.linearGradient}
      />
      <Image source={image} style={styles.ImageBackground} blurRadius={10} />
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size={'large'} />
        </View>
      )}
      <View style={styles.content}>
        <View style={styles.currentBalance}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Typography size="large">
              {i18n.t('BALANCE_SCREEN.CURRENT_BALANCE', {locale: localeValue})}:
            </Typography>
            <Icon name="token" style={styles.tokenIcon} />
            <Typography size="large">{balance?.totalBalance}</Typography>
          </View>
        </View>
        <Advert />
        <View style={styles.title}>
          <Typography
            weight="NotoSerifCondensedLightItalic"
            size="medium"
            style={styles.titleText}>
            {i18n.t('ADD_BALANCE_SHEET.TITLE', {locale: localeValue})}
          </Typography>
        </View>
        <View style={styles.balanceAddWrapper}>
          <Typography size="heading">
            {i18n.t('ADD_BALANCE_SHEET.AMOUNT', {locale: localeValue})}
          </Typography>
          <Typography size="medium" style={styles.balanceAdddesc}>
            {i18n.t('ADD_BALANCE_SHEET.BONUS', {locale: localeValue})}
          </Typography>
        </View>

        <CardView
          setSelectedProduct={setSelectedProduct}
          selectedProduct={selectedProduct}
          products={
            Platform.OS === 'ios'
              ? products.sort(
                  (a, b) => parseFloat(a.price) - parseFloat(b.price),
                )
              : products.sort(
                  (a, b) =>
                    parseFloat(
                      a.oneTimePurchaseOfferDetails?.priceAmountMicros ?? '0',
                    ) -
                    parseFloat(
                      b.oneTimePurchaseOfferDetails?.priceAmountMicros ?? '0',
                    ),
                )
          }
        />

        <MyWebComponent uri="https://term-phi.vercel.app/" />
        <Button
          text={
            selectedProduct
              ? `${selectedProduct?.title} (${selectedProduct?.localizedPrice})`
              : i18n.t('BALANCE_SCREEN.ADD_TOKEN', {locale: localeValue})
          }
          disabled={selectedProduct ? false : true || loading}
          buttonStyle={{height: 60, width: SIZES.width - 20}}
          variant="secondary"
          handlePress={handleBuyProduct}
        />
      </View>
    </View>
  );
};

export default withIAPContext(Purchasing);
