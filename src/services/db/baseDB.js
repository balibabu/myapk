import * as SQLite from "expo-sqlite";

export const baseDB = SQLite.openDatabase("base2.db");

export const note_sync_table = 'NoteSync';
export const note_unsync_table='NoteUnSync';