import React from 'react';
import { useLocation } from 'react-router-dom';
import CardSkeleton from './CardSkeleton';
import styles from './Card.module.scss';

export const Card = ({
  id,
  imageUrl,
  title,
  price,
  onFavorite,
  onPlus,
  favorited = false,
  added = false,
  loading = false,
}) => {
  const { pathname } = useLocation();

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
          {pathname !== '/orders' && (
            <div className={styles.favorite} onClick={onClickFavorite}>
              <img
                src={favorited ? '/img/liked.svg' : '/img/unlike.svg'}
                className={styles.actionButton}
              />
            </div>
          )}
          <img src={imageUrl} className={styles.sneakerPhoto} />
          <p className={styles.cardInfo}>{title}</p>
          <div className={styles.cardPrice}>
            <div>
              <p>Цена:</p>
              <b>{price} грн</b>
            </div>
            {pathname !== '/orders' && (
              <img
                src={added ? '/img/plus-active.svg' : '/img/plus.svg'}
                onClick={onClickPlus}
                className={styles.addToCart}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};
