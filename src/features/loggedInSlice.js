import { createSlice } from '@reduxjs/toolkit';

export const loggedInSlice = createSlice({
    name: 'loggedinSlice',
    initialState: {
        loggedIn: false
    },
    reducers: {
        updateLoggedin(state, action) {
            console.log(action.payload ? 'Logged In' : 'Not Logged In')
            state.loggedIn = action.payload;
        }
    }
});

export const selectLoggedIn = state => {
    return state.loggedIn.loggedIn;
}
export const { updateLoggedin } = loggedInSlice.actions;