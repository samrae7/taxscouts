import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BookDatum } from '../App';
import axios from 'axios';

interface BookData {
    list: BookDatum[];
    error?: string;
}

interface BookState extends BookData {
    isLoading: boolean;
}

const initialState: BookState = {
    list: [],
    isLoading: false,
    error: undefined,
};

export const fetchBooks = createAsyncThunk(
    'books/fetchBooks',
    async (searchTerm: string) => {
        const response = await axios.get<{ docs: BookDatum[] }>(
            `https://openlibrary.org/search.json?q=${searchTerm}`
        );
        return response.data.docs;
    }
);

export const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchBooks.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.list = action.payload;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default bookSlice.reducer;
