import styles from './Header.module.scss';
import { Link } from 'react-router-dom';

export function Header({ onClickOpenCart }) {
  return (
    <header>
      <Link to="/">
        <div className={styles.headerLeft}>
          <img src="/img/logo.png" />
          <div className={styles.headerInfo}>
            <h3>REACT SNEAKERS</h3>
            <p>Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>

      <div className={styles.headerRight}>
        <div onClick={onClickOpenCart} className={styles.headerCart}>
          <img src="/img/cart.svg" />
          <p>1205 грн.</p>
        </div>
        <div>
          <Link to="/favorites">
            <img src="/img/header-like.svg" />
          </Link>
        </div>
        <img src="/img/user.svg" />
      </div>
    </header>
  );
}
