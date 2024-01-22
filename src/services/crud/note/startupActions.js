import { createTableSql } from "../../db/noteUnsync";
import { batchInsert, createTableSql as createTableSqlSync, updateNoteSql } from "../../db/noteSync";
import { getNotes } from "../../../states/noteapp/noteappThunk";
import { getTokenThunk } from "../../../states/userdata/userThunk";
import NetInfo from '@react-native-community/netinfo';
import { getNotesIdsTime, getReqNotes } from "../../api/Note";

export default async function createTables() {
    console.log('startup action: creating tables');
    await createTableSqlSync();
    await createTableSql();
}

export async function fetchNotesFromTable(dispatch) {
    dispatch(getNotes());
}

export async function getNetworkStats(dispatch, setOnline) {
    dispatch(getTokenThunk());
    NetInfo.fetch().then(state => {
        if (state.isConnected) {
            setOnline(state.isConnected)
        }
    });
}

export async function syncWithCloud(notes, token, dispatch) {
    console.log('syncing notes');
    const ids_time = await getNotesIdsTime(token);
    const unsyncedNotesId = findUnmatchedIds(notes.synced, ids_time);
    if (unsyncedNotesId.length > 0) {
        const unsyncedNotes = await getReqNotes(token, unsyncedNotesId);
        console.log('downloading notes');
        await batchInsert(unsyncedNotes);
    }
    console.log('done downloading notes');

    const differentModifiedTimeIds = findDifferentModifiedTimeIds(notes.synced, ids_time);
    if (differentModifiedTimeIds.length > 0) {
        const modifiedNotes = await getReqNotes(token, differentModifiedTimeIds);
        console.log('updating notes');
        for (const note of modifiedNotes) {
            console.log(note.id);
            await updateNoteSql(note);
        }
    }
    console.log('done updating notes');
    fetchNotesFromTable(dispatch);
}


function findUnmatchedIds(localList, serverList) {
    const noteIds = localList.map(note => note.id);
    const serverIds = serverList.map(note => note.id);
    const unmatchedIds = serverIds.filter(id => !noteIds.includes(id));
    return unmatchedIds;
}

function findDifferentModifiedTimeIds(list1, list2) {
    // Create a map to store modified times from list1
    const modifiedTimeMap = new Map(list1.map(note => [note.id, note.modified_time]));
    // Find IDs in list2 where modified time is different from list1
    const differentModifiedTimeIds = list2.filter(note2 =>
        modifiedTimeMap.has(note2.id) && modifiedTimeMap.get(note2.id) !== note2.modified_time
    ).map(note => note.id);

    return differentModifiedTimeIds;
}



