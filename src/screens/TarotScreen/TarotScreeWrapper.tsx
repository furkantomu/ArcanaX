import React, {useEffect} from 'react';
import {View, ScrollView, ActivityIndicator, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';

import {COLORS} from '@/styles/theme';

import {getStyles} from './styles';
import {CustomHeader, Typography} from '@/components';
import {useTarotContext} from './TarotScreenContext';
import AnimatedContent from './components/AnimatedContent';
import {SafeAreaView} from 'react-native-safe-area-context';
import i18n from '@/i18n';
import {useAppSelector} from '@/hooks';

const TarotScreenWrapper = () => {
  const styles = getStyles();
  const {fetchTarotServices, tarotService, loading} = useTarotContext();
  const {localeValue} = useAppSelector(state => state.settings);
  const image = require('../../../assets/background/female.webp');
  const navigation = useNavigation();

  const opacity = useSharedValue(0);

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {display: 'none'},
    });

    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          backgroundColor: '#f5f5dc4f',
          position: 'absolute',
          marginHorizontal: 30,
          marginBottom: 20,
          borderTopWidth: 0,
          height: 50,
          borderBottomWidth: 0,
          borderRadius: 50,
          elevation: 0,
        },
      });
  }, [navigation]);

  useEffect(() => {
    opacity.value = withDelay(
      0,
      withTiming(1, {duration: 800}), // Opaklık değişimi
    );
  }, [opacity]);

  useEffect(() => {
    fetchTarotServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <LinearGradient
          colors={[COLORS.blackOpacity, COLORS.black]}
          style={styles.linearGradient}
        />
        <Animated.Image
          source={image}
          style={[styles.ImageBackground, animatedStyle]}
        />

        <SafeAreaView style={styles.safeAreaView}>
          <CustomHeader leftIcon={true} title={false} rightIcon={true} />
          <Animated.View style={[styles.content, animatedStyle]}>
            <Typography
              weight="NotoSerifThin"
              size="title"
              style={styles.title}>
              {i18n.t('TAROT_READ.TITLE', {locale: localeValue})}
            </Typography>
            <Typography size="medium" style={styles.description}>
              {i18n.t('TAROT_READ.DESCRIPTION', {locale: localeValue})}
            </Typography>
            <Typography size="large" style={styles.subTitle}>
              {i18n.t('TAROT_READ.SUB_TITLE', {locale: localeValue})}
            </Typography>
            {loading ? (
              <ActivityIndicator size={'large'} style={styles.loading} />
            ) : (
              tarotService.map((item, index) => (
                <AnimatedContent
                  key={index}
                  name={item.name}
                  engName={item.engName}
                  aim={item.aim}
                  usageArea={item.usageArea}
                  feature={item.feature}
                  index={index}
                  price={Number(item.price)}
                  onPress={() => {
                    if (item.status === 'Active') {
                      navigation.navigate('TarotSpreadScreen', {
                        type: Number(item.count),
                        name: localeValue === 'tr' ? item.name : item.engName,
                        price: item.price,
                      });
                    } else {
                      Alert.alert(
                        i18n.t('TAROT_READ.ALERT_TITLE', {locale: localeValue}),
                        i18n.t('TAROT_READ.ALERT_DESCRIPTION', {
                          locale: localeValue,
                        }),
                      );
                    }
                  }}
                />
              ))
            )}
          </Animated.View>
        </SafeAreaView>
      </View>
    </ScrollView>
  );
};

export default TarotScreenWrapper;
