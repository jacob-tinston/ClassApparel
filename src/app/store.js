import { configureStore } from "@reduxjs/toolkit";
import { newsletterSlice } from '../features/newsletterSlice';
import { loggedInSlice } from '../features/loggedInSlice';
import { registerSlice } from '../features/registerSlice';
import { loginSlice } from '../features/loginSlice';
import { productsSlice } from '../features/productsSlice';
import { cartSlice } from '../features/cartSlice';

const newsletterReducer = newsletterSlice.reducer;
const loggedInReducer = loggedInSlice.reducer;
const registerReducer = registerSlice.reducer;
const loginReducer = loginSlice.reducer;
const productsReducer = productsSlice.reducer;
const cartReducer = cartSlice.reducer;

export default configureStore({
    reducer: {
        loggedIn: loggedInReducer,
        newsletter: newsletterReducer,
        register: registerReducer,
        login: loginReducer,
        products: productsReducer, 
        cart: cartReducer 
    },
});