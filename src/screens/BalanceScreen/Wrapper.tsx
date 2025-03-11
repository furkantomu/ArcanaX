import {Typography} from '@/components';
import React from 'react';
import {View} from 'react-native';
import AddBalance from './components/AddBalance';

import Header from './components/Header';
import Transactions from './components/Transactions';
import {getStyles} from './styles';
import i18n from '@/i18n';
import { useAppSelector } from '@/hooks';

const Wrapper = () => {
  const {localeValue} = useAppSelector(state => state.settings);
  const styles = getStyles();
  return (
    <View style={styles.container}>
      <Header />
      <AddBalance />
      <Typography size="medium">{i18n.t('BALANCE_SCREEN.TRANSACTION', {locale: localeValue})}:</Typography>
      <Transactions />
    </View>
  );
};

export default Wrapper;
