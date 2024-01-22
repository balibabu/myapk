import NetInfo from '@react-native-community/netinfo';
import { AddNote } from '../../api/Note';
import { addNoteToSynced, addNoteToUnSynced } from '../../../states/noteapp/noteappSlice';
import { addNoteSql } from '../../db/noteSync';
import { addNoteSql as addNoteSqlUnsynced } from '../../db/noteUnsync';

export async function addNote(note, token, dispatch) {
    if (token) {
        const state = await NetInfo.fetch();
        if (state.isConnected) {
            try {
                console.log(note);
                const newNote = await AddNote(token, note);
                console.log(newNote);
                dispatch(addNoteToSynced(newNote));
                addNoteSql(newNote);
                return;
            } catch (error) {
                console.log(error);
            }
        }
    }
    const unsyncedNote = { ...note, action: 'insert' };
    dispatch(addNoteToUnSynced(unsyncedNote));
    addNoteSqlUnsynced(unsyncedNote);
}
