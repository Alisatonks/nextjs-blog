import useCurrencies from '@/hooks/useCurrencies';
import { popularCurrencies } from '@/constants/constants';
import style from './table.module.scss';

export default function Table() {
  const currencies = useCurrencies();

  function sortByCurrency(arr: [string, number][]): [string, number][] {
    const currenciesToMove = popularCurrencies;

    for (let i = 0; i < currenciesToMove.length; i += 1) {
      const currency = currenciesToMove[i];
      const index = arr.findIndex((subArr) => subArr[0] === currency);

      if (index !== -1) {
        arr.splice(i, 0, arr.splice(index, 1)[0]);
      }
    }

    return arr;
  }

  const sortedCurrencies = sortByCurrency(Object.entries(currencies));

  return (
    <div className={style.currencies}>
      <div className={style.table__title}>FX currencies</div>
      <div className={style.tableWrapper}>
        <table className={style.table}>
          <thead className={style.table__head}>
            <tr className={style.table__row}>
              <th className={style.table__col}>Currency</th>
              <th className={style.table__col}>Rate</th>
            </tr>
          </thead>
          <tbody>
            {sortedCurrencies.map((pair, index) => {
              return (
                <tr className={style.table__bodyRow} key={index}>
                  <td className={style.table__bodyCol}>{`1 ${pair[0]}`}</td>
                  <td className={style.table__bodyCol}>{` ${(1 / pair[1]).toFixed(
                    4
                  )} ${Object.entries(currencies)[0][0]}`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
