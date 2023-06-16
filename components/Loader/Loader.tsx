import style from './loader.module.scss';

function Loader() {
    return (
      <div className={style.loader}>
        <div className={`${style.dot} ${style.dot1}`} />
        <div className={`${style.dot} ${style.dot2}`} />
        <div className={`${style.dot} ${style.dot3}`} />
        <div className={`${style.dot} ${style.dot4}`} />
        <div className={`${style.dot} ${style.dot5}`} />
      </div>
    );
  }
  
  export default Loader;