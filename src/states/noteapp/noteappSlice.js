import { createSlice } from "@reduxjs/toolkit"
import { addNoteThunk, deleteNoteThunk, getAllNotesThunk, updateNoteThunk } from "./noteappThunks";

const noteappSlice = createSlice({
    name: 'notes',
    initialState: [],
    reducers: {
        addNote: (state, action) => {
            const newNote = action.payload;
            return [newNote, ...state];
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(getAllNotesThunk.fulfilled, (state, action) => {
                return [...action.payload];
            })
            .addCase(addNoteThunk.fulfilled, (state, action) => {
                const newNote = action.payload;
                return [newNote, ...state]
            })
            .addCase(deleteNoteThunk.fulfilled, (state, action) => {
                const id = action.payload;
                return state.filter((note) => note.id !== id);
            })
            .addCase(updateNoteThunk.fulfilled, (state, action) => {
                const updatedNote = action.payload;
                return state.map((note) =>
                    note.id === updatedNote.id ? updatedNote : note
                );
            })
    },
})

export const { addNote } = noteappSlice.actions;
export default noteappSlice.reducer;