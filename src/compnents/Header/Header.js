import styles from "./Header.module.scss";

function Header(props) {
  return (
    <header>

      <div className={styles.headerLeft}>
        <img src="/img/logo.png"></img>
        <div className={styles.headerInfo}>
          <h3>REACT SNEAKERS</h3>
          <p>Магазин лучших кроссовок</p>
        </div>
      </div>

      <div className={styles.headerRight}>
        <div onClick={props.onClickOpenCart} className={styles.headerCart}>
          <img src="/img/cart.svg"></img>
          <p>1205 грн.</p>
        </div>
        <img src="/img/header-like.svg"></img>
        <img src="/img/user.svg"></img>
      </div>

    </header>
  );
}

export default Header;