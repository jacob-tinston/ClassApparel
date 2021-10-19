import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
    name: 'registerSlice',
    initialState: {
        loginEmail: '',
        loginPassword: ''
    },
    reducers: {
        updateLoginEmail(state, action) {
            state.loginEmail = action.payload
        },
        updateLoginPassword(state, action) {
            state.loginPassword = action.payload
        }
    }
});

export const selectLoginEmail = state => {
    return state.login.loginEmail;
}
export const selectLoginPassword = state => {
    return state.login.loginPassword;
}
export const { updateLoginEmail, updateLoginPassword } = loginSlice.actions;