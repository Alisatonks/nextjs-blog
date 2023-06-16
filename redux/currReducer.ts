"use client";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  baseCurrency: string;
  secondCurrency: string;
};

const initialState: InitialState = {
  baseCurrency: 'EUR',
  secondCurrency: 'USD',
};

export const currReducer = createSlice({
  name: 'selectedCurrencies',
  initialState,
  reducers: {
    changeBaseCurrency: (state, action: PayloadAction<string>) => {
      state.baseCurrency = action.payload;
    },
    changeSecondCurrency: (state, action: PayloadAction<string>) => {
      state.secondCurrency = action.payload;
    },
  },
});

export const { changeBaseCurrency, changeSecondCurrency } = currReducer.actions;

export default currReducer.reducer;
