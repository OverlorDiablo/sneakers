import styles from "./Cart.module.scss";

function Cart({ onClickCloseCart, items = [] }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.rightSiteCart}>
        <h2>Корзина
          <img onClick={onClickCloseCart} className={styles.btnRemove} src="/img/btn-remove.svg"></img>
        </h2>

        <div className={styles.items}>
          {
            items.map((obj) => (
              <div key={obj.id} className={styles.cartItem}>
                <img className={styles.cartItemPhoto} src={obj.imageUrl}></img>
                <div className={styles.cartItemInfo}>
                  <p>{obj.title}</p>
                  <b>{obj.price}</b>
                </div>
                <img className={styles.btnRemove} src="/img/btn-remove.svg"></img>
              </div>
            ))
          }
        </div>

        <div className={styles.cartTotalBlock}>
          <div className={styles.totalPrice}>
            <p>Итого:</p>
            <div className={styles.points}></div>
            <b>21 498 грн.</b>
          </div>
          <div className={styles.tax}>
            <p>Налог 5%:</p>
            <div className={styles.points}></div>
            <b>1074 грн.</b>
          </div>
          <button className={styles.greenBtn}>
            Оформить заказ
            <img src="/img/arrow.svg" className={styles.arrow} />
          </button>
        </div>
      </div>
    </div >
  );
}

export default Cart;