import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { api } from './api';
import { Header, Cart, Main, Favorites } from './components';

function App() {
  const [cartOpened, setCartOpened] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const scrollWidth = window.innerWidth - document.body.offsetWidth;

    document.querySelector('body').style = cartOpened
      ? `padding-right: ${scrollWidth}px; overflow: hidden;`
      : '';
  }, [cartOpened]);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const itemsResponse = await api.get('/items');
      const cartResponse = await api.get('/cart');
      const favoritesResponse = await api.get('/favorites');

      setItems(itemsResponse.data);
      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
    } finally {
      setIsLoading(false);
    }
  };

  const onAddToCart = async (obj) => {
    console.log(obj);

    try {
      const exist = cartItems.find((item) => Number(item.id) === Number(obj.id));

      if (exist) {
        setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));

        await api.delete(`/cart/${obj.id}`);
      } else {
        const { data } = await api.post('/cart', obj);

        setCartItems((prev) => [...prev, data]);
      }

      // if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
      //   axios.delete(`https://639de1ee3542a26130521b71.mockapi.io/cart/${obj.id}`)
      //   setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
      // } else {
      //   const { data } = await axios.post('https://639de1ee3542a26130521b71.mockapi.io/cart', obj);
      //   setCartItems((prev) => [...prev, data])
      // }
    } catch (error) {
      console.log(error);
    }

    // if (cartItems.find((item) => item.id === obj.id)) {
    //   setCartItems((prev) => prev.filter((item) => item.id !== obj.id))
    // } else {
    //   setCartItems((prev) => [...prev, obj])
    // }
  };

  const onAddToFavorite = async (obj) => {
    try {
      const exist = favorites.find((favObj) => favObj.id === obj.id);

      if (exist) {
        setFavorites((prev) => prev.filter((item) => item.id !== obj.id));

        await api.delete(`/favorites/${obj.id}`);
      } else {
        const { data } = await api.post('/favorites', obj);

        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      console.log(error);
    }

    // axios.post('https://639de1ee3542a26130521b71.mockapi.io/favorites', obj);
    // if (favorites.find((item) => item.id === obj.id)) {
    //   setFavorites((prev) => prev.filter((item) => item.id !== obj.id))
    // } else {
    //   setFavorites((prev) => [...prev, obj])
    // }
  };

  const onRemoveItem = (id) => {
    api.delete(`/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="wrapper">
      {cartOpened ? (
        <Cart
          items={cartItems}
          onClickCloseCart={() => setCartOpened(false)}
          onRemove={onRemoveItem}
        />
      ) : null}

      <Header onClickOpenCart={() => setCartOpened(true)} />

      <Routes>
        <Route
          path="/"
          exact
          element={
            <Main
              isLoading={isLoading}
              items={items}
              cartItems={cartItems}
              addToCart={onAddToCart}
              addToFavorite={onAddToFavorite}
            />
          }
        />
        <Route
          path="/favorites"
          exact
          element={<Favorites items={favorites} addToFavorite={onAddToFavorite} />}
        />
      </Routes>
    </div>
  );
}

export default App;
