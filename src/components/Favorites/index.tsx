import React from 'react';
import { useSelector } from 'react-redux';
import { AppContext } from '../../context/AppContext';
import { Card } from '../../components';
import styles from './Favorites.module.scss';
import { CartItem } from '../../redux/slices/cart/types';
import { FavoritesItem } from '../../redux/slices/favorites/types';
import { RootState } from '../../redux/types';

interface FavoritesProps {
  addToCart: (obj: CartItem) => Promise<void>,
  addToFavorite: (obj: FavoritesItem) => Promise<void>
}

export const Favorites: React.FC<FavoritesProps> = ({ addToCart, addToFavorite }) => {
  const { favorites } = useSelector(({ favorites }: RootState) => favorites)
  const { isItemAdded } = React.useContext(AppContext);

  return (
    <main>
      <div className={styles.lineName}>
        <h1>Мои закладки</h1>
      </div>

      <div className={styles.products}>
        {favorites.map((obj: FavoritesItem) => (
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
}