import { ProductsItem } from '../products/types'

export type CartItem = ProductsItem;

export type CartSliceState = {
  cart: CartItem[]
}