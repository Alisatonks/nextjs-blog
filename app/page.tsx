import Image from 'next/image'
import styles from './page.module.scss'
import { FormConverter } from '@/components';
import style from './page.module.scss';
import pageStyle from '../style/page.module.scss';

export default function Page() {
  return (
    <main>
       <div className={pageStyle.page} >
        <div className={style.converter__titleCont}>
          <h2 className={style.converter__title}>Currency Converter</h2>
          <p className={style.converter__text}>
            Check live foreign currency exchange rates
          </p>
        </div>
        <FormConverter />
      </div>
    </main>
  )
}
