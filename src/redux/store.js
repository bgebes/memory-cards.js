import { configureStore } from '@reduxjs/toolkit';
import CardsReducer from './Cards/CardsSlice';
import AppReducer from './App/AppSlice';

export const store = configureStore({
  reducer: {
    app: AppReducer,
    cards: CardsReducer,
  },
});
