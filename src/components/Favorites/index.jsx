import React from 'react';
import { Card } from '../../components';
import styles from './Favorites.module.scss';

export function Favorites({ items, addToFavorite }) {
  return (
    <main>
      <div className={styles.lineName}>
        <h1>Мои закладки</h1>
      </div>

      <div className={styles.products}>
        {items.map((obj) => (
          <Card
            key={obj.id}
            id={obj.id}
            title={obj.title}
            price={obj.price}
            imageUrl={obj.imageUrl}
            onFavorite={addToFavorite}
            favorited={true}
          />
        ))}
      </div>
    </main>
  );
}

// const items = [
//   {
//     "id": 1,
//     "title": "Мужские Кроссовки Nike Blazer Mid Suede",
//     "price": 12999,
//     "imageUrl": "/img/sneakers/sneak1.jpg"
//   },
//   {
//     "id": 2,
//     "title": "Мужские Кроссовки Nike Air Max 270",
//     "price": 14600,
//     "imageUrl": "/img/sneakers/sneak2.jpg"
//   },
//   {
//     "id": 3,
//     "title": "Мужские Кроссовки Nike Blazer Mid Suede",
//     "price": 8499,
//     "imageUrl": "/img/sneakers/sneak3.jpg"
//   },
//   {
//     "id": 4,
//     "title": "Кроссовки Puma X Aka Boku Future Rider",
//     "price": 8999,
//     "imageUrl": "/img/sneakers/sneak4.jpg"
//   },
//   {
//     "id": 5,
//     "title": "Мужские Кроссовки Under Armour Curry 8",
//     "price": 15199,
//     "imageUrl": "/img/sneakers/sneak5.jpg"
//   },
//   {
//     "id": 6,
//     "title": "Мужские Кроссовки Nike Kyrie 7",
//     "price": 11299,
//     "imageUrl": "/img/sneakers/sneak6.jpg"
//   },
//   {
//     "id": 7,
//     "title": "Мужские Кроссовки Jordan Air Jordan 11",
//     "price": 10799,
//     "imageUrl": "/img/sneakers/sneak7.jpg"
//   },
//   {
//     "id": 8,
//     "title": "Мужские Кроссовки Nike LeBron XVIII",
//     "price": 16499,
//     "imageUrl": "/img/sneakers/sneak8.jpg"
//   },
//   {
//     "id": 9,
//     "title": "Мужские Кроссовки Nike Lebron XVIII Low",
//     "price": 13999,
//     "imageUrl": "/img/sneakers/sneak9.jpg"
//   },
//   {
//     "id": 10,
//     "title": "Мужские Кроссовки Nike Blazer Mid Suede",
//     "price": 8499,
//     "imageUrl": "/img/sneakers/sneak10.jpg"
//   },
//   {
//     "id": 11,
//     "title": "Кроссовки Puma X Aka Boku Future Rider",
//     "price": 8999,
//     "imageUrl": "/img/sneakers/sneak11.jpg"
//   },
//   {
//     "id": 12,
//     "title": "Мужские Кроссовки Nike Kyrie Flytrap IV",
//     "price": 11299,
//     "imageUrl": "/img/sneakers/sneak12.jpg"
//   }
// ];
