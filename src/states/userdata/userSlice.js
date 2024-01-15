import { createSlice } from "@reduxjs/toolkit";
import { deleteTokenThunk, getTokenThunk, saveTokenThunk } from "./userThunk";

const userSlice = createSlice({
    name: 'user',
    initialState: { token: null },
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(saveTokenThunk.fulfilled, (state, action) => {
                return { ...state, token: action.payload };
            })
            .addCase(getTokenThunk.fulfilled, (state, action) => {
                return { ...state, token: action.payload };
            })
            .addCase(deleteTokenThunk.fulfilled, (state) => {
                return { ...state, token: null }
            })
    }
})

export default userSlice.reducer;