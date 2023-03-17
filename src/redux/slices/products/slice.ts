import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProductsItem, ProductsSliceState } from './types'

const initialState: ProductsSliceState = {
  items: []
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<ProductsItem[]>) => {
      state.items = action.payload
    }
  },
})

export const { setItems } = productsSlice.actions

export default productsSlice.reducer