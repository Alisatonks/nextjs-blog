"use client";
import { ChangeEvent, useCallback } from 'react';
import { changeBaseCurrency } from '../../redux/currReducer';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import Select from '../Select/Select';
import Table from '../Table/Table';
import useFetchCurrencies from '../../hooks/useFetchCurrencies';
import useCurrencies from '../../hooks/useCurrencies';
import Loader from '../Loader/Loader';
import style from './BaseCurr.module.scss';

function BaseCurr() {
  const dispatch = useAppDispatch();
  const baseCurrency = useAppSelector(
    (state) => state.selectedCurrencies.baseCurrency
  );

  const currencies = useCurrencies();

  const handleSelectedCurr1 = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      dispatch(changeBaseCurrency(e.target.value));
    },
    [dispatch]
  );

  const responseObj = useAppSelector((state) => state.currencies);

  useFetchCurrencies(baseCurrency);

  if (responseObj.loading) {
    return <Loader />;
  }
  return (
    <div className={style.baseCurr}>
      {responseObj.error && <div>Sorry, something went wrong</div>}
      <Table />
      <div className={style.baseCurrency}>
        <Select
          currencies={currencies}
          handleSelectedCurr={handleSelectedCurr1}
          value={baseCurrency}
          id="base"
        />
      </div>
    </div>
  );
}

export default BaseCurr;
