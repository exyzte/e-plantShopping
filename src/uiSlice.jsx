import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isCartView: false,
        showLandingPage: true,
    },
    reducers: {
        toggleView: (state) => {
            state.isCartView = !state.isCartView;
        },
        showCartView: (state) => {
            state.isCartView = true;
            state.showLandingPage = false;
        },
        showProductListView: (state) => {
            state.showLandingPage = false;
            state.isCartView = false;
        },
    }
});

export const { toggleView, showCartView, showProductListView } = uiSlice.actions;

export default uiSlice.reducer;