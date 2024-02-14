import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isLoading: false,
    error: null
}

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUserStart: state => {
            state.isLoading = true
        },
        getUserSuccess: (state, action) => {
            state.isLoading = false
            state.user = action.payload
        },
        getUserError: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        editUserStart: state => {
            state.isLoading = true
        },
        editUserSuccess: (state, action) => {
            state.isLoading = false
            state.user = action.payload
        },
        editUserError: state => {
            state.isLoading = false
            state.error = 'Error'
        }
    }
}) 

export const { getUserStart, getUserSuccess, getUserError, editUserStart, editUserSuccess, editUserError } = UserSlice.actions
export default UserSlice.reducer