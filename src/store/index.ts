import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore, ThunkAction, Action, AnyAction} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import {appReducer} from '@/store/reducers';
import {setStore} from '@/store/storeAccessor';

// Disable this in testing environment
const shouldLoadDebugger = __DEV__ && !process.env.JEST_WORKER_ID;

const reactotronInstance = shouldLoadDebugger
  ? require('../../ReactotronConfig').default
  : null;

const CURRENT_VERSION = 1;

const persistConfig = {
  key: 'Root',
  version: CURRENT_VERSION,
  storage: AsyncStorage,

  migrate: async (state: any) => {
    if (!state?._persist?.version || state._persist.version < CURRENT_VERSION) {
      const initialState = appReducer(undefined, {type: 'INIT'});
      return {
        ...initialState,
      };
    }
    return state;
  },
};

const rootReducer = (
  state: ReturnType<typeof appReducer>,
  action: AnyAction,
) => {
  if (action.type === 'auth/logout') {
    const initialState = appReducer(undefined, {type: 'INIT'});
    return {...initialState};
  }
  return appReducer(state, action);
};

// @ts-ignore
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  enhancers: getDefaultEnhancers =>
    shouldLoadDebugger
      ? getDefaultEnhancers().concat(reactotronInstance.createEnhancer!())
      : getDefaultEnhancers(),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      immutableCheck: {warnAfter: 128},
    }),
});

setStore(store);

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
