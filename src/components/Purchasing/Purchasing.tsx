/* eslint-disable react/jsx-no-comment-textnodes */
import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Platform,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {
  isIosStorekit2,
  PurchaseError,
  requestPurchase,
  useIAP,
  withIAPContext,
  Sku,
} from 'react-native-iap';
import {getStyles} from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '@/styles/theme';
import Typography from '../Typography/Typography';
import i18n from '@/i18n';
import {useAppDispatch, useAppSelector} from '@/hooks';
import Icon from '../Icon';
import {useScaleAnimation} from '@/utils';
import Animated from 'react-native-reanimated';
import {balanceActions} from '@/store/balance/balanceActions';
import {showToast} from '@/utils/showToast';
import Advert from '../Advert/Advert';
import {apiService} from '@/services/APIService';

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

const ProductItem = ({product, handleBuyProduct}) => {
  const styles = getStyles();
  const {handlers, animatedStyle} = useScaleAnimation();

  return (
    <Pressable
      onPress={() => handleBuyProduct(product.productId)}
      {...handlers}>
      <Animated.View style={[styles.productListItem, animatedStyle]}>
        <View style={{flexDirection: 'row'}}>
          <Icon name="token" style={styles.productListItemIcon} />
          <View style={styles.productListItemDescription}>
            <Typography size="large">{product.title}</Typography>
            <Typography size="small" style={styles.productDescription}>
              {product.description}
            </Typography>
          </View>
        </View>
        <Typography>{product.localizedPrice}</Typography>
      </Animated.View>
    </Pressable>
  );
};

const Purchasing = () => {
  const styles = getStyles();
  const dispatch = useAppDispatch();
  const {localeValue} = useAppSelector(state => state.settings);
  const {user} = useAppSelector(state => state.auth);
  const {balance} = useAppSelector(state => state.balance);
  const [loading, setLoading] = useState(false);
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

    try {
      setLoading(true);
      const {transactionId, transactionReceipt} = currentPurchase;
      if ((isIosStorekit2() && transactionId) || transactionReceipt) {
        await finishTransaction({
          purchase: currentPurchase,
          isConsumable: true,
        });

        const {data} = await apiService.post<{
          success: boolean;
          enviroment: string;
          transaction: {
            appTransactionId: string;
            originalTransactionId: string;
            price: number;
            productId: string;
            storefrontId: string;
            transactionId: string;
            balance: string;
          };
        }>('/auth/verify-purchase', {
          transactionId,
        });
        await dispatch(
          balanceActions.addBalance({
            userId: String(user?.id),
            accountId: String(user?.accountId),
            balance: Number(data.transaction.balance),
            amount: data.transaction.price,
            transactionId: data.transaction.transactionId,
            appTransactionId: data.transaction.appTransactionId,
            originalTransactionId: data.transaction.originalTransactionId,
            storefrontId: data.transaction.storefrontId,
            productId: data.transaction.productId,
          }),
        );

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
    } finally {
      setLoading(false);
    }
  }, [
    currentPurchase,
    dispatch,
    finishTransaction,
    localeValue,
    user?.accountId,
    user?.id,
  ]);

  useEffect(() => {
    processPurchase();
  }, [currentPurchase, processPurchase]);

  const handleBuyProduct = async (sku: Sku) => {
    if (currentPurchase?.transactionId) {
      console.log('Zaten aktif bir satın alma var, yeni işlem başlatılmıyor.');
      return;
    }
    try {
      setLoading(true);
      await requestPurchase({sku});
      console.log('requestPurchase');
    } catch (error) {
      console.error('Purchase Error:', error);
    } finally {
      setLoading(false);
    }
  };
  console.log('connection', connected);
  console.log('products', products);

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
        <View style={styles.productList}>
          {products
            .sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
            .map(product => (
              <ProductItem
                key={product.productId}
                product={product}
                handleBuyProduct={handleBuyProduct}
              />
            ))}
        </View>
      </View>
    </View>
  );
};

export default withIAPContext(Purchasing);
