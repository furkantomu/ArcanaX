import {apiService} from '@/services/APIService';

import type {
  AddBalancePayload,
  AddBalanceResponse,
  BalancePayload,
  BalanceResponse,
} from './balanceTypes';

export async function balance(
  credentials: BalancePayload,
): Promise<BalanceResponse> {
  const response = await apiService.get(
    `token/balance/${credentials.accountId}`,
  );
console.log('res', response);
  const data = {
    id: response?.data.id,
    userId: response.data.userId,
    totalBalance: response.data.totalBalance,
    totalAmountPaid: response.data.totalAmountPaid,
    createdAt: response.data.createdAt,
    updatedAt: response.data.updatedAt,
  };

  return {
    balance: data,
  };
}
export async function addBalance(
  credentials: AddBalancePayload,
): Promise<AddBalanceResponse> {
  const response = await apiService.post('token/add-balance', credentials);
  return {
    message: response.data.message,
  };
}
