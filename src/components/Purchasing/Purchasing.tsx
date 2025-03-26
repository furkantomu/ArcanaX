/* eslint-disable react/jsx-no-comment-textnodes */
import React, {useEffect, useState, useCallback} from 'react';
import {View, Platform, Image, ActivityIndicator} from 'react-native';
import {
  isIosStorekit2,
  requestPurchase,
  useIAP,
  withIAPContext,
} from 'react-native-iap';
import {getStyles} from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '@/styles/theme';
import Typography from '../Typography/Typography';
import i18n from '@/i18n';
import {useAppDispatch, useAppSelector} from '@/hooks';
import Icon from '../Icon';

import {balanceActions} from '@/store/balance/balanceActions';
import {showToast} from '@/utils/showToast';
import Advert from '../Advert/Advert';
import {apiService} from '@/services/APIService';
import {CardView} from './CardView';
import {Button} from '../button/Button';

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
  const {localeValue} = useAppSelector(state => state.settings);
  const {user} = useAppSelector(state => state.auth);
  const {balance} = useAppSelector(state => state.balance);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const {connected, products, currentPurchase, finishTransaction, getProducts} =
    useIAP();

  useEffect(() => {
    if (connected) {
      getProducts({skus: productSkus}).catch(error =>
        console.log({message: 'handleGetProducts', error}),
      );
    }
  }, [connected, getProducts]);
  const processPurchase = useCallback(async () => {
    if (!currentPurchase) return;
    if (Platform.OS !== 'ios') return;
    try {
      setLoading(true);
      const {transactionId, transactionReceipt} = currentPurchase;
      if ((isIosStorekit2() && transactionId) || transactionReceipt) {
        await finishTransaction({
          purchase: currentPurchase,
          isConsumable: true,
        });

        await apiService.post<{
          success: boolean;
        }>('/auth/verify-purchase', {
          transactionId,
        });

        await dispatch(
          balanceActions.getBalance({accountId: String(user?.accountId)}),
        );
        showToast({
          message: i18n.t('ADD_BALANCE_SHEET.ADD', {locale: localeValue}) ?? '',
          type: 'success',
        });
      }
    } catch (error) {
      console.error('Error processing purchase:', error);
      showToast({
        message: i18n.t('ADD_BALANCE_SHEET.ERROR', {locale: localeValue}) ?? '',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  }, [
    currentPurchase,
    dispatch,
    finishTransaction,
    localeValue,
    user?.accountId,
  ]);

  useEffect(() => {
    processPurchase();
  }, [currentPurchase, processPurchase]);

  const handleBuyProduct = async () => {
    if (currentPurchase?.transactionId) {
      console.log('Zaten aktif bir satın alma var, yeni işlem başlatılmıyor.');
      return;
    }
    try {
      setLoading(true);
      if (Platform.OS === 'ios') {
        await requestPurchase({sku: selectedProduct?.productId});
      } else {
        const purchaseData = await requestPurchase({
          skus: [selectedProduct?.productId],
        });
        await apiService.post('/auth/verify-purchase-android', {
          purchaseData,
          selectedProduct,
        });

        await dispatch(
          balanceActions.getBalance({accountId: String(user?.accountId)}),
        );
        showToast({
          message: i18n.t('ADD_BALANCE_SHEET.ADD', {locale: localeValue}) ?? '',
          type: 'success',
        });
      }
    } catch (error) {
      console.error('Purchase Error:', error);
      showToast({
        message: i18n.t('ADD_BALANCE_SHEET.ERROR', {locale: localeValue}) ?? '',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
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
          <Advert />
        </View>
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
                      a.oneTimePurchaseOfferDetails.priceAmountMicros,
                    ) -
                    parseFloat(b.oneTimePurchaseOfferDetails.priceAmountMicros),
                )
          }
        />

        <Typography weight="bold" style={styles.privacy}>
          {i18n.t('ADD_BALANCE_SHEET.PRIVACY', {locale: localeValue})}
        </Typography>

        <Button
          text={
            selectedProduct
              ? `${selectedProduct?.title} (${selectedProduct?.localizedPrice})`
              : 'Satın Al'
          }
          disabled={selectedProduct ? false : true || loading}
          variant="secondary"
          handlePress={handleBuyProduct}
        />
      </View>
    </View>
  );
};

export default withIAPContext(Purchasing);
