import { useMemo } from 'react';
import { useAppSelector } from '../redux/hooks';

function useCurrencies() {
  const responseObj = useAppSelector((state) => state.currencies);

  const currencies = useMemo(() => {
    return 'conversion_rates' in responseObj.currencies
      ? responseObj.currencies.conversion_rates
      : {};
  }, [responseObj.currencies]);

  return currencies;
}

export default useCurrencies;
