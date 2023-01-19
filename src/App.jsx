import React from "react";
import { Route, Routes } from 'react-router-dom';
import axios from "axios";
import Header from "./compnents/Header/Header";
import Cart from "./compnents/Cart/Cart";
import Main from "./compnents/Main/Main";
import Favorites from "./compnents/Favorites/Favorites";



function App() {
  const [cartOpened, setCartOpened] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);

  React.useEffect(() => {
    axios.get('https://639de1ee3542a26130521b71.mockapi.io/cart').then((res) => {
      setCartItems(res.data)
    });
    axios.get('https://639de1ee3542a26130521b71.mockapi.io/favorites').then((res) => {
      setFavorites(res.data)
    });
  }, [])

  const onAddToCart = (obj) => {
    axios.post('https://639de1ee3542a26130521b71.mockapi.io/cart', obj);

    if (cartItems.find((item) => item.id === obj.id)) {
      setCartItems((prev) => prev.filter((item) => item.id !== obj.id))
    } else {
      setCartItems((prev) => [...prev, obj])
    }
  }

  const onAddToFavorite = (obj) => {
    if (favorites.find(favObj => favObj.id === obj.id)) {
      axios.delete(`https://639de1ee3542a26130521b71.mockapi.io/favorites/${obj.id}`)
      setFavorites((prev) => prev.filter((item) => item.id !== obj.id))
    } else {
      axios.post('https://639de1ee3542a26130521b71.mockapi.io/favorites', obj)
      setFavorites((prev) => [...prev, obj])
    }



    // axios.post('https://639de1ee3542a26130521b71.mockapi.io/favorites', obj);
    // if (favorites.find((item) => item.id === obj.id)) {
    //   setFavorites((prev) => prev.filter((item) => item.id !== obj.id))
    // } else {
    //   setFavorites((prev) => [...prev, obj])
    // }
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://639de1ee3542a26130521b71.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter(item => item.id !== id))
  }

  return (
    <div className="wrapper">

      {cartOpened ? <Cart items={cartItems} onClickCloseCart={() => setCartOpened(false)} onRemove={onRemoveItem} /> : null}

      <Header onClickOpenCart={() => setCartOpened(true)} />

      <Routes>
        <Route path="/" exact element={<Main addToCart={onAddToCart} addToFavorite={onAddToFavorite} />} />
        <Route path="/favorites" exact element={<Favorites items={favorites} addToFavorite={onAddToFavorite} />} />
      </Routes>





    </div>
  );
}

export default App;