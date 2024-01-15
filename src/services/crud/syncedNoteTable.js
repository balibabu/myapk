import { addNoteSql, createTableSql, deleteNoteSql, fetchNotesSql, updateNoteSql } from "../db/noteSync";

export async function getAllNotes() {
    await createTableSql();
    const notes = await fetchNotesSql();
    return notes;
}

export async function addNote(newNote) {
    await addNoteSql(newNote);
}

export async function deleteNote(id) {
    await deleteNoteSql(id);
}

export async function updateNote(updatedNote) {
    await updateNoteSql(updatedNote);
}
