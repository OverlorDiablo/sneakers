import React from 'react';
import { AppContext } from '../../App';
import { Card } from '../../components';
import styles from './Main.module.scss';

export function Main({ isLoading, items, addToFavorite, addToCart }) {
  const { isItemAdded, isItemFavorited } = React.useContext(AppContext);

  const [searchValue, setSearchValue] = React.useState('');

  const setChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const renderItems = () => {
    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (isLoading ? [...Array(12)] : filteredItems).map((item, index) => (
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