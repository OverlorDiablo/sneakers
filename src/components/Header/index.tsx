import React from "react";
import { useSelector } from 'react-redux';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { RootState } from '../../redux/types';
import { CartItem } from '../../redux/slices/cart/types';

interface HeaderProps {
  onClickOpenCart: () => void
}

export const Header: React.FC<HeaderProps> = ({ onClickOpenCart }) => {
  const { cart } = useSelector(({ cart }: RootState) => cart)

  const totalPrice = cart.reduce((sum: number, obj: CartItem) => obj.price + sum, 0);

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
          <p>{totalPrice} грн</p>
        </div>
        <div>
          <Link to="/favorites">
            <img src="/img/header-like.svg" />
          </Link>
        </div>
        <div>
          <Link to="/orders">
            <img src="/img/user.svg" />
          </Link>
        </div>
      </div>
    </header>
  );
}