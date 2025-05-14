import { combineReducers, configureStore } from '@reduxjs/toolkit'
// We'll use redux-logger just as an example of adding another middleware
import logger from 'redux-logger'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// slice
import authSlice from '../modules/auth/slice';
import leadSlice from '../modules/dashboard/slice/leadSlice';

const persistConfig = {
  debug: false,
  key: 'root',
  keyPrefix: 'v.1',
  storage,
  blacklist: [],
  // add reducer name to persist
  whitelist: ['auth']
}

// combine all reducers here
const rootReducer = combineReducers({
  auth: authSlice,
  lead: leadSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(logger)
});

export const persistor = persistStore(store)