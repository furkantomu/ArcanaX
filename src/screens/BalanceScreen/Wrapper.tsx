import {Typography} from '@/components';
import React from 'react';
import {View} from 'react-native';
import AddBalance from './components/AddBalance';

import Header from './components/Header';
import Transactions from './components/Transactions';
import {getStyles} from './styles';

const Wrapper = () => {
  const styles = getStyles();
  return (
    <View style={styles.container}>
      <Header />
      <AddBalance />
      <Typography size="medium">İşlem Geçmişi:</Typography>
      <Transactions />
    </View>
  );
};

export default Wrapper;
