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
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const scrollWidth = window.innerWidth - document.body.offsetWidth;

    document.querySelector('body').style = cartOpened ? `padding-right: ${scrollWidth}px; overflow: hidden;` : '';
  }, [cartOpened])

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const itemsResponse = await axios.get('https://639de1ee3542a26130521b71.mockapi.io/items')
      const cartResponse = await axios.get('https://639de1ee3542a26130521b71.mockapi.io/cart')
      const favoritesResponse = await axios.get('https://639de1ee3542a26130521b71.mockapi.io/favorites')
      setIsLoading(false);

      setItems(itemsResponse.data)
      setCartItems(cartResponse.data)
      setFavorites(favoritesResponse.data)
    }

    fetchData();
  }, [])

  const onAddToCart = async (obj) => {
    console.log(obj);

    try {
      const exist = cartItems.find((item) => Number(item.id) === Number(obj.id))

      if (exist) {
        setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))

        await axios.delete(`https://639de1ee3542a26130521b71.mockapi.io/cart/${obj.id}`)
      } else {
        const { data } = await axios.post('https://639de1ee3542a26130521b71.mockapi.io/cart', obj);

        setCartItems((prev) => [...prev, data])
      }

      // if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
      //   axios.delete(`https://639de1ee3542a26130521b71.mockapi.io/cart/${obj.id}`)
      //   setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
      // } else {
      //   const { data } = await axios.post('https://639de1ee3542a26130521b71.mockapi.io/cart', obj);
      //   setCartItems((prev) => [...prev, data])
      // }
    } catch (error) {
      alert("Error")
    }

    // if (cartItems.find((item) => item.id === obj.id)) {
    //   setCartItems((prev) => prev.filter((item) => item.id !== obj.id))
    // } else {
    //   setCartItems((prev) => [...prev, obj])
    // }
  }

  const onAddToFavorite = async (obj) => {
    try {
      const exist = favorites.find(favObj => favObj.id === obj.id)

      if (exist) {
        setFavorites((prev) => prev.filter((item) => item.id !== obj.id))

        await axios.delete(`https://639de1ee3542a26130521b71.mockapi.io/favorites/${obj.id}`)
      } else {
        const { data } = await axios.post('https://639de1ee3542a26130521b71.mockapi.io/favorites', obj)

        setFavorites((prev) => [...prev, data])
      }
    } catch (error) {
      alert("Error")
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
        <Route path="/" exact element={<Main isLoading={isLoading} items={items} cartItems={cartItems} addToCart={onAddToCart} addToFavorite={onAddToFavorite} />} />
        <Route path="/favorites" exact element={<Favorites items={favorites} addToFavorite={onAddToFavorite} />} />
      </Routes>





    </div>
  );
}

export default App;