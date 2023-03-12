import React from 'react'
import { useSelector } from 'react-redux';
import { CartItem } from '../redux/slices/cart/types';
import { FavoritesItem } from '../redux/slices/favorites/types';
import { RootState } from '../redux/types';

interface AppContextProps {
  isItemAdded: (id: number) => boolean,
  isItemFavorited: (id: number) => boolean,
  cartOpened: boolean,
  onCartOpen: () => void,
  onCartClose: () => void
}

export const AppContext = React.createContext<AppContextProps>({} as AppContextProps);

export const AppProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { cart } = useSelector(({ cart }: RootState) => cart)
  const { favorites } = useSelector(({ favorites }: RootState) => favorites)

  const [cartOpened, setCartOpened] = React.useState(false);

  const isItemAdded = (id: number) => {
    return cart.some((obj: CartItem) => Number(obj.id) === Number(id));
  };

  const isItemFavorited = (id: number) => {
    return favorites.some((obj: FavoritesItem) => Number(obj.id) === Number(id));
  };

  const onCartOpen = () => {
    setCartOpened(true)
  }

  const onCartClose = () => {
    setCartOpened(false)
  }

  return (
    <AppContext.Provider
      value={{ isItemAdded, isItemFavorited, cartOpened, onCartOpen, onCartClose }}
    >
      {children}
    </AppContext.Provider>
  )
}