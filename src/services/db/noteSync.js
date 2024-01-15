import { baseDB, note_sync_table } from "./baseDB";

const db = baseDB;

export async function createTableSql() {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `create table if not exists ${note_sync_table} (
                    id integer primary key not null,
                    user_id integer,
                    title text,
                    description text,
                    color text,
                    created_time text,
                    modified_time text
                );`,
                [],
                (_, result) => resolve(result),
                (_, error) => reject(error)
            );
        },
        (error) => console.error("Transaction Error:", error),
        );
    });
}


export function fetchNotesSql() {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    `select * from ${note_sync_table} ORDER BY id DESC;`,
                    [],
                    (_, { rows }) => resolve(rows._array),
                    (_, error) => reject(new Error("Error fetching notes:" + error))
                );
            },
            (error) => {
                reject(new Error("Transaction error:" + error));
            }
        );
    });
}


export async function addNoteSql(newNote) {
    db.transaction(
        (tx) => {
            tx.executeSql(
                `INSERT INTO ${note_sync_table} (user_id, title, description, color, created_time, modified_time) VALUES (?, ?, ?, ?, ?, ?);`,
                [newNote.user_id, newNote.title, newNote.description, newNote.color, newNote.created_time, newNote.modified_time]
            );
        }
    );
}


export async function updateNoteSql(updatedNote) {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    `UPDATE ${note_sync_table} SET title=?, description=?, color=?, modified_time=? WHERE id=?;`,
                    [updatedNote.title, updatedNote.description, updatedNote.color, updatedNote.modified_time, updatedNote.id],
                    (_, result) => resolve(result),
                    (_, error) => reject(error)
                );
            },
            (error) => console.error("Transaction Error:", error)
        );
    });
}

export async function deleteNoteSql(id) {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    `delete from ${note_sync_table} where id = ?`,
                    [id],
                    (_, result) => resolve(result),
                    (_, error) => reject(error)
                );
            },
            (error) => console.log("Transaction Error:", error),
            () => console.log("Transaction Success")
        );
    });
}
