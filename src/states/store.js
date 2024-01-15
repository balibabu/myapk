import { configureStore } from "@reduxjs/toolkit";
import noteappReducer from './noteapp/noteappSlice'
import themeReducer from './theme/themeSlice'
import userReducer from './userdata/userSlice'

export const store = configureStore({
    reducer: {
        noteapp: noteappReducer,
        theme: themeReducer,
        user: userReducer,
    }
})

