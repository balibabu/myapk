import { configureStore } from "@reduxjs/toolkit";
import noteappReducer from './noteapp/noteappSlice'
import themeReducer from './theme/themeSlice'

export const store = configureStore({
    reducer: {
        noteapp: noteappReducer,
        theme: themeReducer
    }
})

