import { createAsyncThunk } from "@reduxjs/toolkit";
import { addNote, deleteNote, getAllNotes, updateNote } from "../../services/crud/unsyncedNoteTable";

export const getAllNotesThunk = createAsyncThunk('noteapp/fetchAllNotes', async () => {
    const notes = await getAllNotes();
    console.log('getAllNotesThunk');
    return notes;
});

export const addNoteThunk = createAsyncThunk('noteapp/addNote', async (noteData) => {
    const newNote = await addNote(noteData);
    return newNote;
});

export const deleteNoteThunk = createAsyncThunk('noteapp/deleteNote', async (id) => {
    const status = await deleteNote(id);
    if (status) {
        return id;
    } else {
        return null;
    }
})

export const updateNoteThunk = createAsyncThunk('noteapp/updateNote', async (note) => {
    const updatedNote = await updateNote(note);
    return updatedNote;
})

export const syncNoteThunk = createAsyncThunk('noteapp/syncNote', async (token) => {
    const notes = await getAllNotes();
    // notes.map((note)=>{

    // })
    console.log(token);
    console.log(notes);
})