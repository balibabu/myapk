import NetInfo from '@react-native-community/netinfo';
import { deleteNoteFromSynced, deleteNoteFromUnSynced } from "../../../states/noteapp/noteappSlice";
import { DeleteNote } from "../../api/Note";
import { addNoteSql, deleteNoteSql as deleteNoteSqlUnsync } from "../../db/noteUnsync";
import { deleteNoteSql } from "../../db/noteSync";

export async function deleteNote(id, token, dispatch, isSynced) {
    if (!isSynced) {
        console.log('not synced');
        dispatch(deleteNoteFromUnSynced(id));
        deleteNoteSqlUnsync(id);
        return;
    }
    if (token) {
        console.log('synced');
        const state = await NetInfo.fetch();
        if (state.isConnected) {
            try {
                const status = await DeleteNote(token, id);
                if (status) {
                    dispatch(deleteNoteFromSynced(id));
                    deleteNoteSql(id);
                    return;
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    // offline of failure situation
    deleteNoteSql(id);
    addNoteSql({ id, action: 'delete' })
}

// import { deleteNoteFromSynced, deleteNoteFromUnSynced } from "../../../states/noteapp/noteappSlice";
// import { DeleteNote } from "../../api/Note";
// import { addNoteSql, deleteNoteSql as deleteNoteSqlUnsync } from "../../db/noteUnsync";
// import { deleteNoteSql } from "../../db/noteSync";

// export async function deleteNote(id, token, dispatch, isSynced) {
//     if (!isSynced) {
//         dispatch(deleteNoteFromUnSynced(id));
//         deleteNoteSqlUnsync(id);
//         return;
//     }

//     if (token) {
//         NetInfo.fetch().then(state => {
//             if (state.isConnected) {
//                 DeleteNote(token, id).then((status) => {
//                     if (status) {
//                         dispatch(deleteNoteFromSynced(id));
//                         deleteNoteSql(id);
//                     }
//                     // throw new Error  // check if this correct way
//                 }).catch((error) => {
//                     deleteNoteSql(id);
//                     addNoteSql({ id, action: 'delete' })
//                     console.log(error);
//                 })
//             }
//         });
//     }
// }