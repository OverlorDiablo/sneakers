import React from "react";
import { AppContext } from '../../context/AppContext';
import styles from './Cart.module.scss';

interface InfoProps {
  image: string,
  title: string,
  description: string
}

const Info: React.FC<InfoProps> = ({ image, title, description }) => {
  const { onCartClose } = React.useContext(AppContext);

  return (
    <div className={styles.cartEmpty}>
      <img className={styles.imgCartEmpty} src={image} alt="" />
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <button onClick={onCartClose} className={styles.greenBtn}>
        <img src="/img/arrow.svg" className={styles.arrowLeft} />
        Вернуться назад
      </button>
    </div>
  )
}

export default Info;