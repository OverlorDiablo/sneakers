import React from 'react';
import { AppContext } from '../../context/AppContext';
import { Card } from '../../components';
import { CartItem } from '../../redux/slices/cart/types';
import { FavoritesItem } from '../../redux/slices/favorites/types';
import { ProductsItem } from '../../redux/slices/products/types';
import styles from './Main.module.scss';

interface MainProps {
  isLoading: boolean,
  items: ProductsItem[],
  addToFavorite: (id: FavoritesItem) => Promise<void>,
  addToCart: (obj: CartItem) => Promise<void>
}

export const Main: React.FC<MainProps> = ({ isLoading, items, addToFavorite, addToCart }) => {
  const { isItemAdded, isItemFavorited, } = React.useContext(AppContext);

  const [searchValue, setSearchValue] = React.useState('');

  const setChangeSearchInput: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchValue(event.target.value);
  };

  const renderItems = () => {
    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (isLoading ? [...Array(12)] : filteredItems).map((item: ProductsItem, index: number) => (
      <Card
        key={index}
        onFavorite={addToFavorite}
        onPlus={addToCart}
        added={isItemAdded(item && item.id)}
        favorited={isItemFavorited(item && item.id)}
        loading={isLoading}
        {...item}
      />
    ));
  };

  return (
    <main>
      <div className={styles.lineName}>
        <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
        <div className={styles.searchBlock}>
          <img src="/img/search.png" />
          <input onChange={setChangeSearchInput} placeholder="Поиск..." />
        </div>
      </div>

      <div className={styles.products}>{renderItems()}</div>
    </main>
  );
}