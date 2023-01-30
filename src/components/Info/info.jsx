import React from "react";
import { AppContext } from '../../App';
import styles from './Cart.module.scss';

const Info = ({ image, title, description }) => {
  const { setCartOpened } = React.useContext(AppContext);


  return (
    <div className={styles.cartEmpty}>
      <img className={styles.imgCartEmpty} src={image} alt="" />
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <button onClick={() => setCartOpened(false)} className={styles.greenBtn}>
        <img src="/img/arrow.svg" className={styles.arrowLeft} />
        Вернуться назад
      </button>
    </div>
  )
}

export default Info;