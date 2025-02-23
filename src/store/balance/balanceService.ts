import {apiService} from '@/services/APIService';

import type {BalancePayload, BalanceResponse} from './balanceTypes';

export async function balance(
  credentials: BalancePayload,
): Promise<BalanceResponse> {
  const response = await apiService.get(
    `token/balance/${credentials.accountId}`,
  );

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
