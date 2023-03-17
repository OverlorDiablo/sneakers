import React from "react";
import { useSelector } from 'react-redux';
import { api } from '../../api';
import Info from "../Info/info";
import styles from './Cart.module.scss';
import { setCartItems } from '../../redux/slices/cart/slice';
import { RootState } from '../../redux/types';
import { CartItem } from '../../redux/slices/cart/types';
import { ProductsItem } from '../../redux/slices/products/types';
import { useAppDispatch } from '../../redux/store';

interface CartProps {
  onClickCloseCart: () => void,
  onRemove: (id: number) => void,
  items: ProductsItem[],
  opened: boolean
}

export const Cart: React.FC<CartProps> = ({ onClickCloseCart, onRemove, items, opened }) => {
  const dispatch = useAppDispatch();
  const { cart } = useSelector(({ cart }: RootState) => cart)
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const totalPrice = cart.reduce((sum: number, obj: CartItem) => obj.price + sum, 0);

  const onClickOrder = async () => {
    const { data: orders } = await api.get('/orders');
    const { data: newOrder } = await api.post('/orders', {
      id: orders.length + 1,
      items: cart
    });

    api.put('/cart', []);

    setOrderId(newOrder.id);
    setIsOrderComplete(true);
    dispatch(setCartItems([]));
  }

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ' '}`}>
      <div className={styles.rightSideCart}>
        <h2>
          Корзина
          <img
            onClick={onClickCloseCart}
            className={styles.btnRemove}
            src="/img/btn-remove.svg"
          />
        </h2>

        {items.length > 0 ? (
          <div className={styles.cartComplete}>
            <div className={styles.items}>
              {items.map((obj: CartItem) => (
                <div key={obj.id} className={styles.cartItem}>
                  <img className={styles.cartItemPhoto} src={obj.imageUrl} />
                  <div className={styles.cartItemInfo}>
                    <p>{obj.title}</p>
                    <b>{obj.price}</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className={styles.btnRemove}
                    src="/img/btn-remove.svg"
                  />
                </div>
              ))}
            </div>
            <div className={styles.cartTotalBlock}>
              <div className={styles.totalPrice}>
                <p>Итого:</p>
                <div className={styles.points} />
                <b>{totalPrice} грн</b>
              </div>
              <div className={styles.tax}>
                <p>Налог 5%:</p>
                <div className={styles.points} />
                <b>{Math.round(totalPrice * 0.05)} грн</b>
              </div>
              <button onClick={onClickOrder} className={styles.greenBtn}>
                Оформить заказ
                <img src="/img/arrow.svg" className={styles.arrowRight} />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? "Заказ оформлен" : " Корзина пустая"}
            description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
            image={isOrderComplete ? "/img/complete-order.png" : "/img/empty-cart.png"}
          />
        )}
      </div>
    </div >
  );
}
