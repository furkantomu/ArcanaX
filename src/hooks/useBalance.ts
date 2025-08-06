import {useEffect, useCallback} from 'react';
import {useAppDispatch, useAppSelector} from '../hooks';
import {balanceActions} from '@/store/balance/balanceActions';

export const useBalance = () => {
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.auth);
  const balance = useAppSelector(state => state.balance);

  const fetchBalance = useCallback(() => {
    if (user?.accountId) {
      dispatch(balanceActions.getBalance({accountId: String(user.accountId)}));
    }
  }, [dispatch, user?.accountId]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  return {
    balance: balance.balance,
    loading: balance.loading,
    error: balance.error,
    refetch: fetchBalance,
  };
};