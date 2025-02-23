import {combineReducers} from 'redux';

import authSlice from '@/store/auth/authSlice';
import balanceSlice from './balance/balanceSlice';

export const appReducer = combineReducers({
  auth: authSlice,
  balance: balanceSlice,
});
