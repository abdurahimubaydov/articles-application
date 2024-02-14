import { createSlice } from "@reduxjs/toolkit";
import { setItem } from "../helpers";

const initialState = {
    isLoading: false,
    loggedIn: false,
    user: null,
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authStart: state => {
            state.isLoading = true
        },
        authSuccess: (state, action) => {
            state.isLoading = false
            state.loggedIn = true
            state.user = action.payload
            setItem('token', action.payload.token)
        },
        authError: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        logOut: state => {
            state.loggedIn = false
            state.user = null
        }
    }
})

export const { authStart, authSuccess, authError, logOut } = authSlice.actions
export default authSlice.reducer