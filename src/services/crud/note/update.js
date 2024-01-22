import NetInfo from '@react-native-community/netinfo';
import { addNoteToUnSynced, deleteNoteFromSynced, updateNoteSynced, updateNoteUnSynced } from "../../../states/noteapp/noteappSlice";
import { UpdateNote } from "../../api/Note";
import { deleteNoteSql, updateNoteSql } from "../../db/noteSync";
import { addNoteSql, updateNoteSql as updateNoteSqlUnsync } from "../../db/noteUnsync";

export async function updatedNote(note, isSynced, token, dispatch) {
    if (!isSynced) {
        updateNoteSqlUnsync(note);
        dispatch(updateNoteUnSynced(note));
        return;
    }
    if (token) {
        const state = await NetInfo.fetch();
        if (state.isConnected) {
            try {
                const status = await UpdateNote(token, note);
                if (status) {
                    updateNoteSql(note);
                    dispatch(updateNoteSynced(note));
                    return;
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    // on failure or offline # moving from synced to unsynced
    addNoteSql({ ...note, action: 'update' });
    deleteNoteSql(note.id);
    dispatch(deleteNoteFromSynced(note.id));
    dispatch(addNoteToUnSynced(note));
}
