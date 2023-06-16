import Link from 'next/link';
import style from './header.module.scss';

function Header() {
  return (
    <header className={style.header}>
      <h1 className={style.header__title}>Currency Converter</h1>
      <div className={style.header__linksCont}>
        <div className={style.header__navlink}>
          <Link href="/">Converter</Link>
        </div>
        <div className={style.header__navlink}>
          <Link href="/currencies">Currencies</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
