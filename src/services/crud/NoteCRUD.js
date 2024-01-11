import { addNoteSql, deleteNoteSql, fetchNotesSql, updateNoteSql } from "../db/notedb";

export async function getAllNotes(){
    const notes=await fetchNotesSql();
    return notes;
}

export async function addNote(newNote){
    await addNoteSql(newNote);
    return newNote;
}

export async function deleteNote(id){
    await deleteNoteSql(id);
    return true;
}

export async function updateNote(updatedNote){
    await updateNoteSql(updatedNote);
    return updatedNote;
}