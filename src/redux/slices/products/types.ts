export type ProductsItem = {
  id: number,
  imageUrl: string,
  title: string,
  price: number
}

export type ProductsSliceState = {
  items: ProductsItem[]
}