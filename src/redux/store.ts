import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './bookSlice';

export const store = configureStore({
    reducer: {
        books: booksReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {books: BookState}
export type AppDispatch = typeof store.dispatch;
