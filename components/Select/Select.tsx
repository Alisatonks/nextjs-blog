import { ChangeEvent } from 'react';
import style from '../FormConverter/formConverter.module.scss';

type SelectProps = {
  currencies: { [key: string]: number } | object;
  handleSelectedCurr: (e: ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  id: string;
};

function Select(props: SelectProps) {
  const { currencies, handleSelectedCurr, value, id } = props;
  return (
    <label className={style.form__label} htmlFor={id}>
      Choose {id} currency
      <select
        className={style.form__select}
        name="currency"
        onChange={handleSelectedCurr}
        value={id === 'base' ? value : undefined}
        defaultValue={id !== 'base' ? value : undefined}
        id={id}
      >
        {Object.keys(currencies).map((currency, index) => {
          return <option key={index}>{currency}</option>;
        })}
      </select>
    </label>
  );
}

export default Select;