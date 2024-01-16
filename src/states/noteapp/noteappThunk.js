import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllNotes } from "../../services/crud/note/fetch";

export const getNotes=createAsyncThunk('noteapp/getNotes',async (token)=>{
    const notes=await fetchAllNotes();
    return notes;
})