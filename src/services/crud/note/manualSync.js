import { deleteNoteFromUnSynced } from "../../../states/noteapp/noteappSlice";
import { deleteNoteSql } from "../../db/noteUnsync";
import { addNote } from "./insert";

export async function uploadUnsyncedNotes(notes, dispatch, token) {
    for (const note of notes) {
        try {
            if (note.action === 'insert') {
                await addNote(note, token, dispatch);
                dispatch(deleteNoteFromUnSynced(note.id));
                deleteNoteSql(note.id);
            }
        } catch (error) {
            console.log(error);
        }
    }
}