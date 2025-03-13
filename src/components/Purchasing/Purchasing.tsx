import React, { useEffect, useState, useCallback } from 'react';
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
import { getStyles } from './styles';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '@/styles/theme';
import Typography from '../Typography/Typography';
import i18n from '@/i18n';
import { useAppDispatch, useAppSelector } from '@/hooks';
import Icon from '../Icon';
import { useScaleAnimation } from '@/utils';
import Animated from 'react-native-reanimated';
import { balanceActions } from '@/store/balance/balanceActions';
import { showToast } from '@/utils/showToast';

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
  android: [],
  default: [],
}) as string[];

const ProductItem = ({ product, handleBuyProduct }) => {
  const styles = getStyles();
  const { handlers, animatedStyle } = useScaleAnimation();

  return (
    <Pressable onPress={() => handleBuyProduct(product.productId)} {...handlers}>
      <Animated.View style={[styles.productListItem, animatedStyle]}>
        <View style={{ flexDirection: 'row' }}>
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
  const { localeValue } = useAppSelector(state => state.settings);
  const { user } = useAppSelector(state => state.auth);
  const { balance } = useAppSelector(state => state.balance);
  const [loading, setLoading] = useState(false);
  const {
    connected,
    products,
    currentPurchase,
    finishTransaction,
    getProducts,
    purchaseHistory,
  } = useIAP();

  useEffect(() => {
    if (connected) {
      getProducts({ skus: productSkus }).catch(error =>
        console.log({ message: 'handleGetProducts', error })
      );
    }
  }, [connected, getProducts]);
  const processPurchase = useCallback(async () => {
    if (!currentPurchase) return;

    try {
      const { productId, transactionId, transactionReceipt } = currentPurchase;
      if ((isIosStorekit2() && transactionId) || transactionReceipt) {
        const result = await finishTransaction({ purchase: currentPurchase, isConsumable: true });

        const findProduct = products.find(i => i.productId === productId);
        const balanceAmount = Number(productId.split('_').pop());
        if (findProduct) {
          await dispatch(
            balanceActions.addBalance({
              userId: user.id,
              accountId: user.accountId,
              balance: balanceAmount,
              amount: Number(findProduct.price),
            })
          );
        }
        await dispatch(balanceActions.getBalance({ accountId: String(user.accountId) }));
        showToast({
          message: i18n.t('ADD_BALANCE_SHEET.ADD', { locale: localeValue }) ?? '',
          type: 'success',
        });
      }
    } catch (error) {
      console.error('Error processing purchase:', error);
    }
  }, [currentPurchase, dispatch, finishTransaction, localeValue, products, user]);

  useEffect(() => {
    processPurchase();
  }, [currentPurchase, processPurchase]);

  const handleBuyProduct = async (sku: Sku) => {
    if (currentPurchase?.transactionId) {
      console.log("Zaten aktif bir satın alma var, yeni işlem başlatılmıyor.");
      return;
    }
    try {
      setLoading(true);
      await requestPurchase({ sku });
      console.log('requestPurchase');
    } catch (error) {
      console.error('Purchase Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={[COLORS.black, COLORS.blackOpacity1, COLORS.black]} style={styles.linearGradient} />
      <Image source={image} style={styles.ImageBackground} blurRadius={10} />
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size={'large'} />
        </View>
      )}
      <View style={styles.content}>
        <View style={styles.currentBalance}>
          <Typography size="large">
            {i18n.t('BALANCE_SCREEN.CURRENT_BALANCE', { locale: localeValue })}:
          </Typography>
          <Icon name="token" style={styles.tokenIcon} />
          <Typography size="large">{balance?.totalBalance}</Typography>
        </View>
        <View style={styles.title}>
          <Typography weight="NotoSerifCondensedLightItalic" size="medium" style={styles.titleText}>
            {i18n.t('ADD_BALANCE_SHEET.TITLE', { locale: localeValue })}
          </Typography>
        </View>
        <View style={styles.productList}>
          {products
            .sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
            .map(product => (
              <ProductItem key={product.productId} product={product} handleBuyProduct={handleBuyProduct} />
            ))}
        </View>
      </View>
    </View>
  );
};

export default withIAPContext(Purchasing);
