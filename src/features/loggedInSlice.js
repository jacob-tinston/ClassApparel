import { createSlice } from '@reduxjs/toolkit';

export const loggedInSlice = createSlice({
    name: 'loggedinSlice',
    initialState: {
        loggedIn: false
    },
    reducers: {
        updateLoggedin(state) {
            if (state.loggedin) {
                state.loggedIn = false;
            } else {
                state.loggedIn = true;
            }
        }
    }
});

export const selectLoggedIn = state => {
    return state.loggedIn.loggedIn;
}
export const { updateLoggedIn } = loggedInSlice.actions;