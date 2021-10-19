import { createSlice } from '@reduxjs/toolkit';

export const newsletterSlice = createSlice({
    name: 'newsletterSlice',
    initialState: {
        newsletter: ''
    },
    reducers: {
        updateNewsletter(state, action) {
            state.newsletter = action.payload
        }
    }
});

export const selectNewsletter = state => {
    return state.newsletter.newsletter;
}
export const { updateNewsletter } = newsletterSlice.actions;