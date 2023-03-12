import { combineReducers } from '@reduxjs/toolkit';
import productsSlice from './products/slice';
import cartSlice from './cart/slice';
import favoritesSlice from './favorites/slice';

const reducers = combineReducers({
  products: productsSlice,
  cart: cartSlice,
  favorites: favoritesSlice,
})

export default reducers