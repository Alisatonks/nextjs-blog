import { useEffect } from 'react';
import { fetchCurrencies } from '../redux/currenciesReducer';
import { useAppSelector, useAppDispatch } from '../redux/hooks';

function useFetchCurrencies(baseCurrency: string) {
  const dispatch = useAppDispatch();
  const responseObj = useAppSelector((state) => state.currencies);

  useEffect(() => {
    if (
      !('conversion_rates' in responseObj.currencies) ||
      responseObj.currencies.base_code !== baseCurrency
    ) {
      dispatch(fetchCurrencies(baseCurrency));
    }
  }, [baseCurrency, dispatch, responseObj.currencies]);
}

export default useFetchCurrencies;
