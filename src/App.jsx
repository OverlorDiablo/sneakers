import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { api } from './api';
import { Header, Cart, Main, Favorites, Orders } from './components';

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
      const [itemsResponse, cartResponse, favoritesResponse] = await Promise.all([
        api.get('/items'),
        api.get('/cart'),
        api.get('/favorites'),
      ]);

      setItems(itemsResponse.data);
      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
    } finally {
      setIsLoading(false);
    }
  };

  const onAddToCart = (obj) => {
    try {
      const exist = cartItems.find((item) => Number(item.id) === Number(obj.id));

      if (exist) {
        onRemoveItem(obj.id);
      } else {
        setCartItems((prev) => [...prev, obj]);

        api.post('/cart', obj);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onAddToFavorite = (obj) => {
    try {
      const exist = favorites.find((item) => Number(item.id) === Number(obj.id));

      if (exist) {
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
        api.delete(`/favorites/${obj.id}`);
      } else {
        setFavorites((prev) => [...prev, obj]);
        api.post('/favorites', obj);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));

    api.delete(`/cart/${id}`);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  };

  const isItemFavorited = (id) => {
    return favorites.some((obj) => Number(obj.id) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        cartItems,
        favorites,
        items,
        isItemAdded,
        isItemFavorited,
        setCartOpened,
        setCartItems,
      }}
    >
      <div className="wrapper">
        <Cart
          items={cartItems}
          onClickCloseCart={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          opened={cartOpened}
        />

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

          <Route path="/orders" exact element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
