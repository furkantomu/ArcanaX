import {createSlice} from '@reduxjs/toolkit';

import {balanceActions} from './balanceActions';
import {Balance} from '@/types/User';

import {showToast} from '@/utils/showToast';
export interface BalanceState {
  balance: Balance | null;
  uiFlags: {
    isBalanceLoading: boolean;
  };
  error: string | null;
}
const initialState: BalanceState = {
  balance: null,
  uiFlags: {
    isBalanceLoading: false,
  },
  error: null,
};
export const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    resetAuth: state => {
      state.balance = null;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(balanceActions.getBalance.pending, state => {
        state.uiFlags.isBalanceLoading = true;
        state.error = null;
      })
      .addCase(balanceActions.getBalance.fulfilled, (state, action) => {
        state.balance = action.payload.balance;
        state.uiFlags.isBalanceLoading = false;
        state.error = null;
      })
      .addCase(balanceActions.getBalance.rejected, (state, action) => {
        state.uiFlags.isBalanceLoading = false;
        state.error = action.payload?.errors ?? null;
        showToast({message: action.payload?.errors ?? '', type: 'error'});
      });
  },
});
export const {resetAuth} = balanceSlice.actions;
export default balanceSlice.reducer;
