import { createSlice } from '@reduxjs/toolkit';


const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        isAuthenticated: null,
        userType : null,
        expiresAt: -1,
        error: null,
    },
    reducers: {
        setCredentials: (state, action) => {
            const { user, token, userType, expiresAt } = action.payload;
            state.user = user;
            state.token = token;
            state.userType = userType;
            state.isAuthenticated = true;
            state.expiresAt = expiresAt;
            state.error = null;
        },
        logout: (state, action) => {
            state.user = null;
            state.token = null;
            state.userType = null;
            state.isAuthenticated = false;
            state.expiresAt = -1;
            state.error = error;
        }
    },
});

export const { setCredentials, logout } = AuthSlice.actions;
export const AuthActions = AuthSlice.actions;
export default AuthSlice.reducer;
export const CurrentUser = (state) => state.auth.user
export const CurrentToken = (state) => state.auth.token
