// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            // Assuming you have a user object coming from the action payload
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
        },
    },
});

export const { login, logout } = authSlice.actions;
export const userSelector = (state: any) => state.auth.user;
export default authSlice.reducer;
