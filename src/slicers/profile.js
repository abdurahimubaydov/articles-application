import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profile: null,
    isLoading: false,
    error: 'null'
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        getProfileStart: state => {
            state.isLoading = true
        },
        getProfileSuccess: (state, action) => {
            state.isLoading = false
            state.profile = action.payload
        },
        getProfileError: state => {
            state.isLoading = false
            state.error = 'Error'
        }
    }
})

export const {getProfileStart, getProfileSuccess, getProfileError} = profileSlice.actions
export default profileSlice.reducer