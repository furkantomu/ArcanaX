import React, {useEffect} from 'react';
import HomeWrapper from './HomeWrapper';
import {AppProvider} from './HomeScreenContext';

import {useAppDispatch, useAppSelector} from '@/hooks';
import {balanceActions} from '@/store/balance/balanceActions';


const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.auth);


  useEffect(() => {
    dispatch(balanceActions.getBalance({accountId: String(user?.accountId)}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);






  return (
    <AppProvider>
      <HomeWrapper />
    </AppProvider>
  );
};

export default HomeScreen;
