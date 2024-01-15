import { addNoteSql, createTableSql, deleteNoteSql, fetchNotesSql, updateNoteSql } from "../db/noteUnsync";

export async function getAllNotes(){
    await createTableSql();
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