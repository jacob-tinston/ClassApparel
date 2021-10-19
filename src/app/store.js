import { configureStore } from "@reduxjs/toolkit";
import { newsletterSlice } from '../features/newsletterSlice';
import { loggedInSlice } from '../features/loggedInSlice';
import { registerSlice } from '../features/registerSlice';
import { loginSlice } from '../features/loginSlice';

const newsletterReducer = newsletterSlice.reducer;
const loggedInReducer = loggedInSlice.reducer;
const registerReducer = registerSlice.reducer;
const loginReducer = loginSlice.reducer;

export default configureStore({
    reducer: {
        loggedIn: loggedInReducer,
        newsletter: newsletterReducer,
        register: registerReducer,
        login: loginReducer
    },
});