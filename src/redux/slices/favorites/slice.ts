import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FavoritesSliceState, FavoritesItem } from './types'

const initialState: FavoritesSliceState = {
  favorites: [],
}

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<FavoritesItem[]>) => {
      state.favorites = action.payload
    },
    addToFavorites: (state, action: PayloadAction<FavoritesItem>) => {
      state.favorites.push(action.payload)
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter((item) => Number(item.id) !== Number(action.payload))
    }
  },
})

export const { setFavorites, addToFavorites, removeFromFavorites } = favoritesSlice.actions

export default favoritesSlice.reducer