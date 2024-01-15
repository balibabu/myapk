import { createAsyncThunk } from "@reduxjs/toolkit";
import { addNote, deleteNote, getAllNotes, updateNote } from "../../services/crud/unsyncedNoteTable";
import { addNote as addNoteSync, deleteNote as deleteNoteSync, getAllNotes as getAllNotesSync, updateNote as updateNoteSync } from "../../services/crud/syncedNoteTable";
import { AddNote } from "../../services/api/Note";

export const getAllNotesThunk = createAsyncThunk('noteapp/fetchAllNotes', async () => {
    const notes = await getAllNotes();
    const syncNotes = await getAllNotesSync();
    console.log('getAllNotesThunk');
    return [...notes,...syncNotes];
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
    try {
        const notes = await getAllNotes();
        notes.forEach(async (note) => {
            const { title, description, color } = note;
            const uploadedNote = await AddNote(token, { title, description, color });
            await addNoteSync(uploadedNote);
            await deleteNote(note.id);
        })
        console.log(token);
        console.log(notes);
    } catch (error) {
        console.log(error);
    }
})