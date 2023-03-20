import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './bookSlice';

export const store = configureStore({
    reducer: {
        books: booksReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {books: BookState}
export type AppDispatch = typeof store.dispatch;
