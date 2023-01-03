import React from "react";
import styles from "./Card.module.scss";

function Card({ id, imageUrl, title, price, onFavorite, onPlus }) {
  const [isAdded, setIsAdded] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);

  const onClickPlus = () => {
    onPlus({ id, imageUrl, title, price });
    setIsAdded(!isAdded);
  }

  const onClickFavorite = () => {
    onFavorite({ id, imageUrl, title, price });
    setIsFavorite(!isFavorite);
  }

  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={onClickFavorite}>
        <img
          src={isFavorite ? "/img/liked.svg" : "/img/unlike.svg"}
          className={styles.actionButton}>
        </img>
      </div>
      <img src={imageUrl} className={styles.sneakerPhoto}></img>
      <p className={styles.cardInfo}>{title}</p>
      <div className={styles.cardPrice}>
        <div>
          <p>Цена:</p>
          <b>{price} грн.</b>
        </div>
        <img
          src={isAdded ? "/img/plus-active.svg" : "/img/plus.svg"}
          onClick={onClickPlus}
          className={styles.addToCart}>
        </img>
      </div>
    </div>
  );
}

export default Card;