import React from "react";
import { AppContext } from '../../App';
import Info from "../Info/info";
import styles from './Cart.module.scss';

export function Cart({ onClickCloseCart, onRemove, items }) {
  const { setCartItems } = React.useContext(AppContext);

  const [isOrderComplete, setIsOrderComplete] = React.useState(false);

  const onClickOrder = () => {
    setIsOrderComplete(true);
    setCartItems([]);
  }


  return (
    <div className={styles.overlay}>
      <div className={styles.rightSiteCart}>
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
              {items.map((obj) => (
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
                <b>21 498 грн.</b>
              </div>
              <div className={styles.tax}>
                <p>Налог 5%:</p>
                <div className={styles.points} />
                <b>1074 грн.</b>
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
            description={isOrderComplete ? "Ваш заказ #6 скоро будет передан курьерской доставке" : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
            image={isOrderComplete ? "/img/complete-order.png" : "/img/empty-cart.png"}
          />
        )}
      </div>
    </div>
  );
}
