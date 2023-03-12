import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartItem, CartSliceState } from './types'

const initialState: CartSliceState = {
  cart: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.cart = action.payload
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.cart.push(action.payload)
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((item) => Number(item.id) !== Number(action.payload))
    }
  },
})

export const { setCartItems, addToCart, removeFromCart } = cartSlice.actions

export default cartSlice.reducer