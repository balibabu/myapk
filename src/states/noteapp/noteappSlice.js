import { createSlice } from "@reduxjs/toolkit"
import { getNotes } from "./noteappThunk";

const noteappSlice = createSlice({
    name: 'notes',
    initialState: { synced: [], unsynced: [] },
    reducers: {
        addNoteToSynced: (state, action) => {
            const note = action.payload;
            return { ...state, synced: [note, ...state.synced] };
        },
        addNoteToUnSynced: (state, action) => {
            const note = action.payload;
            return { ...state, unsynced: [note, ...state.unsynced] };
        },
        deleteNoteFromSynced: (state, action) => {
            const id = action.payload;
            console.log(id);
            return { ...state, synced: state.synced.filter((note) => note.id !== id) }; // check if this correct way
        },
        deleteNoteFromUnSynced: (state, action) => {
            const id = action.payload;
            return { ...state, unsynced: state.unsynced.filter((note) => note.id != id) }; // check if this correct way
        },
        updateNoteSynced: (state, action) => {
            const updatedNote = action.payload;
            return { ...state, synced: state.synced.map((note) => note.id === updatedNote.id ? updatedNote : note) }
        },
        updateNoteUnSynced: (state, action) => {
            const updatedNote = action.payload;
            return { ...state, unsynced: state.unsynced.map((note) => note.id === updatedNote.id ? updatedNote : note) }
        },
        batchInsertNotes: (state, action) => {
            const notes = action.payload;
            return { ...state, synced: [...notes, ...state.synced] };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getNotes.fulfilled, (state, action) => {
                return action.payload;
            })
    }
})

export const {
    addNoteToSynced,
    addNoteToUnSynced,
    deleteNoteFromSynced,
    deleteNoteFromUnSynced,
    updateNoteSynced,
    updateNoteUnSynced,
    batchInsertNotes

} = noteappSlice.actions;

export default noteappSlice.reducer;