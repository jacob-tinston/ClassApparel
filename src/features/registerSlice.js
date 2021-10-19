import { createSlice } from '@reduxjs/toolkit';

export const registerSlice = createSlice({
    name: 'registerSlice',
    initialState: {
        registerForename: '',
        registerSurname: '',
        registerEmail: '',
        registerPassword: ''
    },
    reducers: {
        updateRegisterForename(state, action) {
            state.registerForename = action.payload
        },
        updateRegisterSurname(state, action) {
            state.registerSurname = action.payload
        },
        updateRegisterEmail(state, action) {
            state.registerEmail = action.payload
        },
        updateRegisterPassword(state, action) {
            state.registerPassword = action.payload
        }
    }
});

export const selectRegisterForename = state => {
    return state.register.registerForename;
}
export const selectRegisterSurname = state => {
    return state.register.registerSurname;
}
export const selectRegisterEmail = state => {
    return state.register.registerEmail;
}
export const selectRegisterPassword = state => {
    return state.register.registerPassword;
}
export const { updateRegisterForename, updateRegisterSurname, updateRegisterEmail, updateRegisterPassword } = registerSlice.actions;