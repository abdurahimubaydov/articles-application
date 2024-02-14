import { configureStore } from "@reduxjs/toolkit";
import authSlice from '../slicers/auth'
import articleSlice from '../slicers/articles'
import userSlice from '../slicers/user'
import profileSlice from '../slicers/profile'

export default configureStore({
    reducer: {
        auth: authSlice,
        article: articleSlice,
        user: userSlice,
        profile: profileSlice
    },
    devTools: process.env.NODE_ENV !== 'production'
})