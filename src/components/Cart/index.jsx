import styles from './Cart.module.scss';

export function Cart({ onClickCloseCart, onRemove, items }) {
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
              <button className={styles.greenBtn}>
                Оформить заказ
                <img src="/img/arrow.svg" className={styles.arrowRight} />
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.cartEmpty}>
            <img className={styles.imgCartEmpty} src="/img/empty-cart.png" alt="" />
            <div>
              <h3>Корзина пустая</h3>
              <p>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
            </div>
            <button onClick={onClickCloseCart} className={styles.greenBtn}>
              <img src="/img/arrow.svg" className={styles.arrowLeft} />
              Вернуться назад
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
