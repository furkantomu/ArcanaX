import React, {useEffect} from 'react';
import {Image, View, ScrollView} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {getStyles} from './styles';
import {AppProvider} from './NumerologyDetailContext';
import Header from './components/Header';
import Card from './components/Card';
import Footer from './components/Footer';
import {CustomHeader} from '@/components';
import {SafeAreaView} from 'react-native-safe-area-context';

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
        <Image
          source={bg}
          resizeMode={'cover'}
          style={styles.bg}
          blurRadius={10}
        />
        <ScrollView>
          <SafeAreaView style={styles.container}>
            <CustomHeader leftIcon={true} title={false} rightIcon={true} />

            <Header />
            <Card />
            <Footer />
          </SafeAreaView>
        </ScrollView>
      </View>
    </AppProvider>
  );
};
export default NumerologyScreen;
