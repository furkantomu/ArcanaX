import {createAsyncThunk} from '@reduxjs/toolkit';
import {addBalance, balance} from './balanceService';

import type {
  AddBalancePayload,
  AddBalanceResponse,
  ApiErrorResponse,
  BalancePayload,
  BalanceResponse,
} from './balanceTypes';
import {handleApiError} from './balanceUtils';

const createAuthThunk = <TResponse, TPayload>(
  type: string,
  handler: (payload: TPayload) => Promise<TResponse>,
  errorMessage?: string,
) => {
  return createAsyncThunk<TResponse, TPayload, {rejectValue: ApiErrorResponse}>(
    type,
    async (payload, {rejectWithValue}) => {
      try {
        const response = await handler(payload);
        return response;
      } catch (error) {
        return rejectWithValue(handleApiError(error, errorMessage));
      }
    },
  );
};
export const balanceActions = {
  getBalance: createAuthThunk<BalanceResponse, BalancePayload>(
    'token/balance',
    balance,
  ),
  addBalance: createAuthThunk<AddBalanceResponse, AddBalancePayload>(
    'token/add-balance',
    addBalance,
  ),
};
