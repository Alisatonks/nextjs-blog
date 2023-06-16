"use client"; 
import { ChangeEvent, useCallback, useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { changeBaseCurrency, changeSecondCurrency } from '@/redux/currReducer';
import useFetchCurrencies from '@/hooks/useFetchCurrencies';
import useCurrencies from '@/hooks/useCurrencies';
import Loader from '../Loader/Loader';
import Select from '../Select/Select';
import style from './formConverter.module.scss';
import globStyle from '../../style/buttons.module.scss';

function FormConverter() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();

  const currencies = useCurrencies();

  const baseCurrency = useAppSelector(
    (state) => state.selectedCurrencies.baseCurrency
  );
  const secondCurrency = useAppSelector(
    (state) => state.selectedCurrencies.secondCurrency
  );

  useFetchCurrencies(baseCurrency);
  const responseObj = useAppSelector((state) => state.currencies);

  const handleSelectedCurr1 = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      dispatch(changeBaseCurrency(e.target.value));
      setValue('');
    },
    [dispatch]
  );

  const handleSelectedCurr2 = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      dispatch(changeSecondCurrency(e.target.value));
      setValue('');
    },
    [dispatch]
  );

  const calculateValue = (data: FieldValues) => {
    const val = String(Number(data.value) * currencies[secondCurrency]);
    const res = `${Number(val).toFixed(2)}`;
    const regex = /^0[^.]/g;
    setValue(
      res === 'NaN' || regex.test(data.value)
        ? 'Enter valid amount'
        : `${res} ${secondCurrency}`
    );
  };

  const handleReset = () => {
    reset();
    setValue('');
  };

  const getDate = () => {
    return new Date().toISOString().split('T')[0];
  };
  const today: string = getDate();

  if (responseObj.loading) {
    return <Loader />;
  }
  if (responseObj.error) {
    return <div>Sorry, something went wrong</div>;
  }
  return (
    <form className={style.form} onSubmit={handleSubmit(calculateValue)}>
      <div className={style.form__date}>Today: {today}</div>
      <div className={style.form__wrap}>
        <div className={style.form__miniWrap}>
          <label className={style.form__label} htmlFor="currValue">
            Amount
            <input
              type="text"
              className={style.form__input}
              id="currValue"
              {...register('value', { required: true, pattern: /^[0-9.]+$/ })}
            />
            {errors.value && <span className="error">Please enter number</span>}
          </label>
        </div>
        <div className={style.form__miniWrap}>
          <Select
            currencies={currencies}
            handleSelectedCurr={handleSelectedCurr1}
            value={baseCurrency}
            id="base"
          />
        </div>
        <div className="form__mini-wrap">
          <Select
            currencies={currencies}
            handleSelectedCurr={handleSelectedCurr2}
            value={secondCurrency}
            id="quote"
          />
        </div>
      </div>
      <div className={style.form__result}>{value}</div>
      <div className={style.form__btns}>
        <button className={globStyle.btn} type="submit">
          Submit
        </button>
        <button className={globStyle.btn} type="button" onClick={handleReset}>
          Reset
        </button>
      </div>
    </form>
  );
}

export default FormConverter;
