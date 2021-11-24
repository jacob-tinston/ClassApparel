import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: {
        cartLength: 0,
        cartItems: []
    },
    reducers: {
        updateCartLength(state, action) {
            state.cartLength = action.payload
        },
        updateCartItems(state, action) {
            state.cartItems = action.payload
        }
    }
});

export const selectCartLength = state => {
    return state.cart.cartLength;
}
export const selectCartItems = state => {
    return state.cart.cartItems;
}
export const { updateCartLength, updateCartItems } = cartSlice.actions;