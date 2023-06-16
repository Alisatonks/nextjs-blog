"use client";
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { key, url } from '../constants/constants';

type ConversionRates = {
  [key: string]: number;
};

export type CurrenciesResponse = {
  base_code: string;
  conversion_rates: ConversionRates;
  documentation: string;
  result: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
};

type InitialState = {
  loading: boolean;
  currencies: CurrenciesResponse | object;
  error: string;
};

const initialState: InitialState = {
  loading: false,
  currencies: {},
  error: '',
};

export const fetchCurrencies = createAsyncThunk(
  'currencies/fetchCurrencies',
  async (baseCurrency: string) => {
    try {
      const response = await axios.get<CurrenciesResponse>(
        `${url}${key}/${baseCurrency}`
      );
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Unknown error has occurred');
    }
  }
);

const currenciesReducer = createSlice({
  name: 'currencies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCurrencies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchCurrencies.fulfilled,
      (state, action: PayloadAction<CurrenciesResponse>) => {
        state.loading = false;
        state.currencies = action.payload;
        state.error = '';
      }
    );
    builder.addCase(fetchCurrencies.rejected, (state, action) => {
      state.loading = false;
      state.currencies = {};
      state.error = action.error.message || 'Something went wrong';
    });
  },
});

export default currenciesReducer;
