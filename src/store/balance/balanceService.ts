import {apiService} from '@/services/APIService';

import type {
  AddBalancePayload,
  AddBalanceResponse,
  BalancePayload,
  BalanceResponse,
} from './balanceTypes';
import {Balance} from '@/types/User';

export async function balance(
  credentials: BalancePayload,
): Promise<BalanceResponse> {
  const response = await apiService.get<Balance>(
    `token/balance/${credentials.accountId}`,
  );
  return {
    balance: response.data,
  };
}

export async function addBalance(
  credentials: AddBalancePayload,
): Promise<AddBalanceResponse> {
  const response = await apiService.post<{message: string}>(
    'token/add-balance',
    credentials,
  );
  return {
    message: response.data.message,
  };
}
