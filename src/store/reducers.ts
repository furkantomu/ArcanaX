import {combineReducers} from 'redux';

import authSlice from '@/store/auth/authSlice';
import balanceSlice from './balance/balanceSlice';
import settingsSlice from './settings/settingsSlice';

export const appReducer = combineReducers({
  auth: authSlice,
  balance: balanceSlice,
  settings: settingsSlice,
});
