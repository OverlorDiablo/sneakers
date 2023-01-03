import React from 'react';
import axios from "axios";
import Card from "../Card/Card";
import styles from "./Main.module.scss";

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

function Main({ addToFavorite, addToCart }) {
  //*---------------------------------------------------------*//
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    axios.get('https://639de1ee3542a26130521b71.mockapi.io/items').then((res) => {
      setItems(res.data)
    });
  }, [])

  //*---------------------------------------------------------*//

  const [searchValue, setSearchValue] = React.useState("");

  const setChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  return (
    <main>

      <div className={styles.lineName}>
        <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}</h1>
        <div className={styles.searchBlock}>
          <img src="/img/search.png"></img>
          <input onChange={setChangeSearchInput} placeholder="Поиск..."></input>
        </div>
      </div>

      <div className={styles.products}>
        {items
          .filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
          .map((obj) => (
            <Card
              key={obj.id}
              id={obj.id}
              title={obj.title}
              price={obj.price}
              imageUrl={obj.imageUrl}
              onFavorite={addToFavorite}
              onPlus={addToCart}
            />
          ))}
      </div>

    </main>
  );
}

export default Main;