import { createSlice } from '@reduxjs/toolkit';

export const productsSlice = createSlice({
    name: 'productsSlice',
    initialState: {
        products: []
    },
    reducers: {
        updateProducts(state, action) {
            state.products = action.payload
        }
    }
});

export const selectProducts = state => {
    return state.products.products;
}
export const { updateProducts } = productsSlice.actions;