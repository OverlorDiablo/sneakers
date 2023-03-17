import { ProductsItem } from '../products/types'

export type FavoritesItem = ProductsItem;

export type FavoritesSliceState = {
  favorites: FavoritesItem[]
}