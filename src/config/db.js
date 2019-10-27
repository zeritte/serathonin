import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";

const db = SQLite.openDatabase("../db.db");

export const init = async () => {
  const { exists } = await FileSystem.getInfoAsync(FileSystem.documentDirectory + "db.db");
  if (!exists)
    await FileSystem.downloadAsync(
      "http://structpedia.com/db.db",
      FileSystem.documentDirectory + "db.db"
    )
      .then(({ uri }) => {
        console.log("Finished downloading to ", uri);
      })
      .catch(error => {
        console.error(error);
      });
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM firms",
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const fetchFirms = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM firms",
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const fetchFons = firm_id => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM fons WHERE firm_id = ?",
        [firm_id],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const fetchValue = (date, fon_kod) => {
  console.log(date, fon_kod)
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM degers WHERE date = ? AND fon_kod = ?",
        [date, fon_kod],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};
