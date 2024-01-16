import { baseDB, note_unsync_table } from "./baseDB";

const db = baseDB;

export async function isTablePresent() {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    `SELECT name FROM sqlite_master WHERE type='table' AND name=?;`,
                    [note_unsync_table],
                    (_, result) => {
                        if (result.rows.length > 0) {
                            resolve(true);
                        }
                        resolve(false);
                    },
                    (_, error) => reject(new Error("Error checking table existence: " + error))
                );
            },
            (error) => {
                reject(new Error("Transaction error: " + error));
            }
        );
    });
}

export async function createTableSql() {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `create table if not exists ${note_unsync_table} (
                    id integer primary key not null,
                    title text,
                    description text,
                    color text,
                    created_time text,
                    modified_time text,
                    action text
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
                    `select * from ${note_unsync_table} ORDER BY id DESC;`,
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


export function addNoteSql(newNote) {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    `INSERT INTO ${note_unsync_table} (id, title, description, color, created_time, modified_time, action) VALUES (?,?, ?, ?, ?, ?, ?);`,
                    [newNote.id, newNote.title, newNote.description, newNote.color, newNote.created_time, newNote.modified_time, newNote.action],
                    (_, result) => resolve(result),
                    (_, error) => reject(error)
                );
            },
            (error) => console.error("Transaction Error:", error)
        );
    });
}


export async function updateNoteSql(updatedNote) {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    `UPDATE ${note_unsync_table} SET title=?, description=?, color=?, modified_time=?, action=? WHERE id=?;`,
                    [updatedNote.title, updatedNote.description, updatedNote.color, updatedNote.modified_time, updatedNote.action, updatedNote.id],
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
                    `delete from ${note_unsync_table} where id = ?`,
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
