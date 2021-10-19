import { configureStore } from "@reduxjs/toolkit";
import { newsletterSlice } from '../features/newsletterSlice';

const newsletterReducer = newsletterSlice.reducer;

export default configureStore({
    reducer: {
        newsletter: newsletterReducer
    },
});