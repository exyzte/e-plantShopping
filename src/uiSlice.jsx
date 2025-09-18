import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isCartView: false,
    },
    reducers: {
        toggleView: (state) => {
            state.isCartView = !state.isCartView;
        },
        showCartView: (state) => {
            state.isCartView = true;
        },
        showProductListView: (state) => {
            state.isCartView = false;
        },
    }
});

export const { toggleView, showCartView, showProductListView } = uiSlice.actions;

export default uiSlice.reducer;