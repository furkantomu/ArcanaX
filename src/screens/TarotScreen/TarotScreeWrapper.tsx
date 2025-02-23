import React, {useEffect} from 'react';
import {View, Text, ScrollView, ActivityIndicator} from 'react-native';
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
import {CustomHeader} from '@/components';
import {useTarotContext} from './TarotScreenContext';
import AnimatedContent from './components/AnimatedContent';

const TarotScreenWrapper = () => {
  const styles = getStyles();
  const {fetchTarotServices, tarotService, loading} = useTarotContext();
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
          display: '',
          position: 'absolute',
          backgroundColor: COLORS.blackOpacity,
          borderRadius: 50,
          borderTopWidth: 0,
          marginHorizontal: 30,
          marginVertical: 20,
          height: 50,
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
    <View style={styles.container}>
      <CustomHeader leftIcon={true} title={false} rightIcon={true} />
      <ScrollView>
        <View>
          <Animated.Image
            source={image}
            style={[styles.ImageBackground, animatedStyle]}
          />
          <LinearGradient
            colors={[COLORS.black, COLORS.blackOpacity, COLORS.black]}
            style={styles.linearGradient}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
            locations={[1, 0.05, 1]}
          />
        </View>
        <Animated.View style={[styles.content, animatedStyle]}>
          <Text style={[styles.title]}>Premium İçeriğe Erişin</Text>
          <Text style={styles.description}>
            Tarot kartlarınız, her biri özenle seçilmiş semboller ve derin
            anlamlarla hazırlandı. Her okuma, sizi içsel yolculuğunuza
            yönlendirecek, geçmişinizi, bugününüzü ve geleceğinizi aydınlatacak
            bir rehberlik sunar. Sezgilerinize güvenin ve kartlarınızın size
            sunduğu mesajlara açık olun. Hayatınızın her anına ışık tutmak için
            buradayız.
          </Text>
          <Text style={styles.subTitle}>Tarot Okuma Rehberi:</Text>
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
                onPress={() =>
                  navigation.navigate('TarotSpreadScreen', {
                    type: Number(item.count),
                    name: item.name,
                  })
                }
              />
            ))
          )}
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default TarotScreenWrapper;
