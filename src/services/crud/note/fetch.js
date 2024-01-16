import { fetchNotesSql } from "../../db/noteSync";
import { fetchNotesSql as fetchNotesSqlUnsynced } from "../../db/noteUnsync";

export async function fetchAllNotes() {
    let unsynced = [];
    let synced = [];
    try {
        unsynced = await fetchNotesSqlUnsynced();
    } catch (error) {
        console.log(error);
    }

    try {
        synced = await fetchNotesSql();
    } catch (error) {
        console.log(error);
    }
    return { synced, unsynced };
}