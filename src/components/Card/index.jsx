import React from 'react';
import CardSkeleton from './CardSkeleton';
import styles from './Card.module.scss';

export function Card({
  id,
  imageUrl,
  title,
  price,
  onFavorite,
  onPlus,
  favorited = false,
  added = false,
  loading = false,
}) {
  const onClickPlus = () => {
    onPlus({ id, imageUrl, title, price });
  };

  const onClickFavorite = () => {
    onFavorite({ id, imageUrl, title, price });
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <CardSkeleton />
      ) : (
        <>
          <div className={styles.favorite} onClick={onClickFavorite}>
            <img
              src={favorited ? '/img/liked.svg' : '/img/unlike.svg'}
              className={styles.actionButton}
            />
          </div>
          <img src={imageUrl} className={styles.sneakerPhoto} />
          <p className={styles.cardInfo}>{title}</p>
          <div className={styles.cardPrice}>
            <div>
              <p>Цена:</p>
              <b>{price} грн.</b>
            </div>
            <img
              src={added ? '/img/plus-active.svg' : '/img/plus.svg'}
              onClick={onClickPlus}
              className={styles.addToCart}
            />
          </div>
        </>
      )}
    </div>
  );
}
