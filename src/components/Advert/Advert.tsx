import React, {useEffect, useState} from 'react';
import MobileAds, {
  RewardedAd,
  RewardedAdEventType,
} from 'react-native-google-mobile-ads';
import {IconButton} from '../button/IconButton';
import {Platform, StyleSheet, View} from 'react-native';
import Typography from '../Typography/Typography';
import i18n from '@/i18n';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {balanceActions} from '@/store/balance/balanceActions';
import {showToast} from '@/utils/showToast';
import {requestTrackingPermission} from 'react-native-tracking-transparency';

const adUnitId = Platform.select({
  ios: 'ca-app-pub-4348716433106304/4541223694', // 'ca-app-pub-4348716433106304/4541223694' TestIds.REWARDED
  android: 'ca-app-pub-4348716433106304/7546892492', // 'ca-app-pub-4348716433106304/7546892492'
});

const createRewardedAd = (
  setLoaded: any,
  setRewarded: any,
  isPersonalized: boolean,
) => {
  const newRewarded = RewardedAd.createForAdRequest(String(adUnitId), {
    requestNonPersonalizedAdsOnly: !isPersonalized,
  });

  newRewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
    console.log('✅ Reklam Yüklendi');
    setLoaded(true);
  });

  newRewarded.addAdEventListener(RewardedAdEventType.EARNED_REWARD, () => {
    console.log('🚀 Reklam kapatıldı, yeni reklam yükleniyor...');
    setLoaded(false);
    createRewardedAd(setLoaded, setRewarded, isPersonalized);
  });

  newRewarded.load();
  setRewarded(newRewarded);
};

const Advert = () => {
  const dispatch = useAppDispatch();
  const {localeValue} = useAppSelector(state => state.settings);
  const {user} = useAppSelector(state => state.auth);
  const [rewarded, setRewarded] = useState(null);
  const [isPersonalized, setIsPersonalized] = useState(true);

  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const initAds = async () => {
      // 👉 ATT izni iste
      const trackingStatus = await requestTrackingPermission();
      console.log('🛡️ Tracking Permission:', trackingStatus);

      if (trackingStatus === 'authorized') {
        setIsPersonalized(true);
      } else {
        setIsPersonalized(false);
      }

      MobileAds()
        .initialize()
        .then(statuses => {
          console.log('✅ Google Mobile Ads Başlatıldı:', statuses);
        });

      createRewardedAd(setLoaded, setRewarded, isPersonalized);
    };

    initAds();

    return () => {
      rewarded?.removeAllListeners();
    };
  }, []);

  //console.log('rewarded', rewarded);
  useEffect(() => {
    if (!rewarded) return;

    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      async reward => {
        console.log('🏆 Kullanıcı ödül kazandı:', reward);
        await dispatch(
          balanceActions.addBalance({
            userId: String(user?.id),
            accountId: String(user?.accountId),
            balance: Number(reward.amount),
            amount: 0,
            transactionId: '',
            appTransactionId: '',
            originalTransactionId: '',
            storefrontId: '',
            productId: '',
          }),
        );

        await dispatch(
          balanceActions.getBalance({accountId: String(user?.accountId)}),
        );

        showToast({
          message:
            i18n.t('ADD_BALANCE_SHEET.ADD', {
              locale: localeValue,
              bonus: `${reward.amount} jeton`,
            }) ?? '',
          type: 'success',
        });
      },
    );

    return () => {
      unsubscribeEarned();
    };
  }, [rewarded, dispatch, localeValue, user?.accountId, user?.id]);

  const handleAdPress = () => {
    if (loaded && rewarded) {
      rewarded?.show();
    } else {
      console.warn('⚠️ Reklam henüz yüklenmedi, lütfen bekleyin.');
      showToast({
        message: 'Reklam yükleniyor, lütfen bekleyin...',
        type: 'warning',
      });
      rewarded?.load(); // Eğer yüklenmemişse tekrar yükle
    }
  };

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <IconButton
        iconName="advert"
        iconSize={30}
        buttonStyle={styles.button}
        iconStyle={styles.icon}
        text=""
        handlePress={handleAdPress}
      />
      <Typography>{i18n.t('ADS_BUTTON', {locale: localeValue})}</Typography>
    </View>
  );
};

export default Advert;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  button: {
    width: 50,
  },
  icon: {
    resizeMode: 'cover',
  },
});
