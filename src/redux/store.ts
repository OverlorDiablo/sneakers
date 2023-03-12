import { useDispatch } from 'react-redux'
import type { AppDispatch } from './types'
import { configureStore } from '@reduxjs/toolkit'
import reducers from './slices';

const store = configureStore({
  reducer: reducers,
})

export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;