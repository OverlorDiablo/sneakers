import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { api } from './api';
import { Header, Cart, Main, Favorites } from './components';

export const AppContext = React.createContext({});

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
    try {
      const exist = cartItems.find((item) => Number(item.id) === Number(obj.id));

      if (exist) {
        onRemoveItem(obj.id);
      } else {
        const { data } = await api.post('/cart', obj);

        setCartItems((prev) => [...prev, data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      const exist = favorites.find((item) => Number(item.id) === Number(obj.id));

      if (exist) {
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));

        const { data } = await api.get(`/favorites?id=${obj.id}`);
        await api.delete(`/favorites/${data[0]._id}`);
      } else {
        const { data } = await api.post('/favorites', obj);

        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onRemoveItem = async (id) => {
    setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));

    const { data } = await api.get(`/cart?id=${id}`);

    await api.delete(`/cart/${data[0]._id}`);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  };

  const isItemFavorited = (id) => {
    return favorites.some((obj) => Number(obj.id) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{ cartItems, favorites, items, isItemAdded, isItemFavorited, setCartOpened, setCartItems }}
    >
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
            element={
              <Favorites addToCart={onAddToCart} addToFavorite={onAddToFavorite} />
            }
          />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
