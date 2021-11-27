import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: {
        cartLength: 0,
        cartItems: [],
        cartTotal: 0
    },
    reducers: {
        updateCartItems(state, action) {
            state.cartItems = action.payload;

            let length = 0;
            state.cartItems.forEach(item => {
                length = length + parseInt(item.quantity);
            })
            state.cartLength = length;

            let total = 0;
            state.cartItems.forEach(item => {
                total = total + item.price * parseInt(item.quantity);
            })
            state.cartTotal = total;
        },
        updateItemQuantity(state, action) {
            state.cartItems[action.payload[0]].quantity = action.payload[1];
        }
    }
});

export const selectCartLength = state => {
    return state.cart.cartLength;
}
export const selectCartItems = state => {
    return state.cart.cartItems;
}
export const selectCartTotal = state => {
    return state.cart.cartTotal;
}
export const { updateCartItems, updateItemQuantity } = cartSlice.actions;