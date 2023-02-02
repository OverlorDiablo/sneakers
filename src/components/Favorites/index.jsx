import React from 'react';
import { AppContext } from '../../App';
import { Card } from '../../components';
import styles from './Favorites.module.scss';

export const Favorites = ({ addToCart, addToFavorite }) => {
  const { isItemAdded, favorites } = React.useContext(AppContext);

  return (
    <main>
      <div className={styles.lineName}>
        <h1>Мои закладки</h1>
      </div>

      <div className={styles.products}>
        {favorites.map((obj) => (
          <Card
            key={obj.id}
            id={obj.id}
            title={obj.title}
            price={obj.price}
            imageUrl={obj.imageUrl}
            onPlus={addToCart}
            onFavorite={addToFavorite}
            added={isItemAdded(obj.id)}
            favorited={true}
          />
        ))}
      </div>
    </main>
  );
};
