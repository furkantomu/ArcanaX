import React, {useEffect} from 'react';
import {Image, View, ScrollView} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import {getStyles} from './styles';
import {AppProvider} from './NumerologyDetailContext';
import Header from './components/Header';
import Card from './components/Card';
import Footer from './components/Footer';
import { CustomHeader } from '@/components';

const NumerologyScreen = () => {
  const navigation = useNavigation();
  const styles = getStyles();
  const bg = require('../../../assets/background/bg4.webp');

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {display: 'none'},
    });
  }, [navigation]);

  return (
    <AppProvider>
      <View style={styles.container}>
      <CustomHeader leftIcon={true} title={false} rightIcon={true} />
        <Image
          source={bg}
          resizeMode={'cover'}
          style={styles.bg}
          blurRadius={10}
        />
        <ScrollView>
          <Header />
          <Card />
          <Footer />
        </ScrollView>
      </View>
    </AppProvider>
  );
};
export default NumerologyScreen;

// Yaşam Yolu Sayısı
// Kişisel Yıl Sayısı
// Kader Sayısı
// Kişisel Ay Sayısı
// Kişisel Gün Sayısı
// Ana Sayılar (Master Numbers): 11, 22, 33, vb.
// Karmik Sayılar
// İçsel Ruh Sayısı
// Zihinsel Sayı
// Yuanın Sayısı (Maturity Number)
