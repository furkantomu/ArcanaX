import {Balance} from '@/types/User';

export interface BalancePayload {
  accountId: string;
}

export interface BalanceResponse {
  balance: Balance;
}

export interface AddBalancePayload {
  userId: string;
  accountId: string;
  balance: number;
  amount: number;
  transactionId: string;
  appTransactionId: string;
  originalTransactionId: string;
  storefrontId: string;
  productId: string;
}
export interface AddBalanceResponse {
  message: string;
}


export interface ApiErrorResponse {
  success: boolean;
  errors: string;
}
