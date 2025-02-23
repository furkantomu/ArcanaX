import {Balance} from '@/types/User';

export interface BalancePayload {
  accountId: string;
}

export interface BalanceResponse {
  balance: Balance;
}

export interface ApiErrorResponse {
  success: boolean;
  errors: string;
}
