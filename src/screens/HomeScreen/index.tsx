import React, {useEffect} from 'react';
import {View} from 'react-native';

import {getStyles} from './styles';
import HomeWrapper from './HomeWrapper';
import {AppProvider} from './HomeScreenContext';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {balanceActions} from '@/store/balance/balanceActions';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const styles = getStyles();
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.auth);

  useAppSelector(state => console.log('home', state));

  const navigation = useNavigation();
  console.log('get state', navigation.getState());


  useEffect(() => {
    dispatch(balanceActions.getBalance({accountId: String(user?.accountId)}));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppProvider>
      <View style={styles.flex}>
        <HomeWrapper />
      </View>
    </AppProvider>
  );
};

export default HomeScreen;
