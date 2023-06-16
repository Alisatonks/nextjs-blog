"use client";
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { currReducer } from './currReducer';
import currenciesReducer from './currenciesReducer';

const rootReducer = combineReducers({
  selectedCurrencies: currReducer.reducer,
  currencies: currenciesReducer.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
