import React from 'react';
import { AppContext } from './context/AppContext';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { api } from './api';
import { Header, Cart, Main, Favorites, Orders } from './components';
import { setItems } from './redux/slices/products/slice';
import { setCartItems, addToCart, removeFromCart } from './redux/slices/cart/slice';
import { setFavorites, addToFavorites, removeFromFavorites } from './redux/slices/favorites/slice';
import { RootState } from './redux/types';
import { CartItem } from './redux/slices/cart/types';
import { FavoritesItem } from './redux/slices/favorites/types';
import { ProductsItem } from './redux/slices/products/types';
import { useAppDispatch } from './redux/store';

function App() {
  const dispatch = useAppDispatch();
  const { onCartOpen, onCartClose, cartOpened } = React.useContext(AppContext);
  const { items } = useSelector(({ products }: RootState) => products)
  const { cart } = useSelector(({ cart }: RootState) => cart)
  const { favorites } = useSelector(({ favorites }: RootState) => favorites)

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const scrollWidth = window.innerWidth - document.body.offsetWidth;
    const cartElement = document.querySelector('body') as HTMLElement

    if (cartOpened) {
      cartElement.style.paddingRight = `${scrollWidth}px`;
      cartElement.style.overflow = 'hidden';
    } else {
      cartElement.style.paddingRight = '';
      cartElement.style.overflow = '';
    }
  }, [cartOpened]);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [itemsResponse, cartResponse, favoritesResponse] = await Promise.all([
        api.get<ProductsItem[]>('/items'),
        api.get<CartItem[]>('/cart'),
        api.get<FavoritesItem[]>('/favorites')
      ]);

      dispatch(setItems(itemsResponse.data));
      dispatch(setCartItems(cartResponse.data))
      dispatch(setFavorites(favoritesResponse.data));
    } finally {
      setIsLoading(false);
    }
  };

  const onAddToCart = async (obj: CartItem) => {
    try {
      const exist = cart.find((item) => Number(item.id) === Number(obj.id));

      if (exist) {
        dispatch(removeFromCart(obj.id));
        await api.delete(`/cart/${obj.id}`);
      } else {
        const { data } = await api.post<CartItem>('/cart', obj);

        dispatch(addToCart(data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onAddToFavorite = async (obj: FavoritesItem) => {
    try {
      const exist = favorites.find((item) => Number(item.id) === Number(obj.id));

      if (exist) {
        dispatch(removeFromFavorites(obj.id));
        await api.delete(`/favorites/${obj.id}`);
      } else {
        const { data } = await api.post<FavoritesItem>('/favorites', obj);
        dispatch(addToFavorites(data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onRemoveFromCart = async (id: number) => {
    dispatch(removeFromCart(id));
    await api.delete(`/cart/${id}`);
  };

  return (
    <div className="wrapper">
      <Cart
        items={cart}
        onClickCloseCart={onCartClose}
        onRemove={onRemoveFromCart}
        opened={cartOpened}
      />

      <Header onClickOpenCart={onCartOpen} />

      <Routes>
        <Route
          path="/"
          element={
            <Main
              isLoading={isLoading}
              items={items}
              addToCart={onAddToCart}
              addToFavorite={onAddToFavorite}
            />
          }
        />

        <Route
          path="/favorites"
          element={
            <Favorites addToCart={onAddToCart} addToFavorite={onAddToFavorite} />
          }
        />

        <Route
          path="/orders"
          element={
            <Orders />
          }
        />
      </Routes>
    </div>
  );
}

export default App;