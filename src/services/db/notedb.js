import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("test2.db");

export async function createTableSql() {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                `create table if not exists Notes (
                        id integer primary key not null,
                        title text,
                        description text,
                        color text
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
            "select * from Notes ORDER BY id DESC;",
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
  
// export async function fetchNotesSql(setNotes) {
//     db.transaction((tx) => {
//         tx.executeSql(
//             "select * from Notes ORDER BY id DESC;", [],
//             (_, { rows }) => setNotes(rows._array),
//             (_, error) => console.log("Error fetching notes:", error)
//         );
//     });
// }


export async function addNoteSql(newNote) {
    db.transaction(
        (tx) => {
            tx.executeSql("insert into Notes (id, title, description,color) values (?, ?, ?,?)",[newNote.id, newNote.title, newNote.description, newNote.color]);
        }
    );
}


export async function updateNoteSql(updatedNote) {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    "update Notes set title=?, description=?, color=? where id=?",
                    [updatedNote.title, updatedNote.description, updatedNote.color, updatedNote.id],
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
                    "delete from Notes where id = ?",
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

