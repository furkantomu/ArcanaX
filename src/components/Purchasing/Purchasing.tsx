import React, {useEffect, useState} from 'react';
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

const image = require('../../../assets/background/tokenBg.webp');

const productSkus = Platform.select({
  ios: [
    'arcanaX_app_token_25',
    'arcanaX_app_token',
    'arcanaX_app_token_75',
    'arcanaX_app_token_100',
    'arcanaX_app_token_200',
    'arcanaX_app_token_500',
    'arcanaX_app_token_1000',
  ],
  android: [],
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
        <View>
          <Typography>{product.localizedPrice}</Typography>
        </View>
      </Animated.View>
    </Pressable>
  );
};

const Purchasing = () => {
  const styles = getStyles();
  const dispatch = useAppDispatch();
  const {localeValue} = useAppSelector(state => state.settings);
  const {user} = useAppSelector(state => state.auth);
  console.log(user);
  const {balance} = useAppSelector(state => state.balance);
  const [loading, setLoading] = useState(false);
  const {
    connected,
    products,
    currentPurchase,
    currentPurchaseError,
    initConnectionError,
    finishTransaction,
    getProducts,
  } = useIAP();
  console.log('connected', connected);
  console.log('products', products);
  console.log('currentPurchase', currentPurchase);
  console.log('currentPurchaseError', currentPurchaseError);
  console.log('initConnectionError', initConnectionError);

  useEffect(() => {
    handleGetProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetProducts = async () => {
    try {
      await getProducts({skus: productSkus});
    } catch (error) {
      console.log({message: 'handleGetProducts', error});
    }
  };
  useEffect(() => {
    const checkCurrentPurchase = async () => {
      try {
        if (
          (isIosStorekit2() && currentPurchase?.transactionId) ||
          currentPurchase?.transactionReceipt
        ) {
          await finishTransaction({
            purchase: currentPurchase,
            isConsumable: true,
          });
          const findProduct = products.find(
            i => i.productId === currentPurchase.productId,
          );
          const parts = currentPurchase.productId.split('_');
          const data = {
            userId: user.id,
            accountId: user.accountId,
            balance: Number(parts.pop()),
            amount: Number(findProduct?.price),
          };
          await dispatch(balanceActions.addBalance(data));
          await dispatch(
            balanceActions.getBalance({accountId: String(user?.accountId)}),
          );
        }
      } catch (error) {
        if (error instanceof PurchaseError) {
          console.log({message: `[${error.code}]: ${error.message}`, error});
        } else {
          console.log({message: 'handleBuyProduct', error});
        }
      }
    };

    checkCurrentPurchase();
  }, [currentPurchase, finishTransaction]);

  const handleBuyProduct = async (sku: Sku) => {
    try {
      setLoading(true);
      await requestPurchase({sku});
    } catch (error) {
      if (error instanceof PurchaseError) {
        console.log({message: `[${error.code}]: ${error.message}`, error});
      } else {
        console.log({message: 'handleBuyProduct', error});
      }
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
          <Typography size="large">
            {i18n.t('BALANCE_SCREEN.CURRENT_BALANCE', {locale: localeValue})}:
          </Typography>
          <Icon name="token" style={styles.tokenIcon} />
          <Typography size="large">{balance?.totalBalance}</Typography>
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
            .sort(
              (a, b) =>
                parseFloat(a.price.replace(/[^0-9.-]+/g, '')) -
                parseFloat(b.price.replace(/[^0-9.-]+/g, '')),
            )
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
