import Documents from "../models/scan";
import DatabaseConnection from "../config/db";

export class DocumentRepo{

  static getDocumentsByTimestamp(id: string):Promise<Documents[]|undefined> {
    return new Promise((resolve, reject) => {
      DatabaseConnection.connection.query("SELECT * FROM document WHERE chatbot_rooms_id = ? ORDER BY created_at ASC", [id], (error, results: Documents[]) => {
        if (error) {
          // console.log(" this error is in getDoc ")
          resolve(undefined);
        } else {
          resolve(results);
        }
      })
    })
  }
  static getDocumentsUrl(id:string):Promise<String|undefined> {
    return new Promise((resolve, reject) => {
      DatabaseConnection.connection.query("SELECT file_url FROM documents WHERE chatbots_room_id = ?", [id], (error, results: Documents[]) => {
        if (error) {
          // console.log(" this error is in getDocurl ")

          resolve(undefined);
        } else {
          resolve(results[0].file_url);
        }
      })
    })
  }
  static seveResultDocument(document:Documents):Promise<boolean|undefined> {
    return new Promise((resolve, reject) => {
      console.log("id:",document.id, "chatbot_rooms_id:",document.chatbot_rooms_id, "users_id:",document.users_id, "name:",document.name, "file_url:",document.file_url, "original:",document.original, "augmented:",document.augmented);
      DatabaseConnection.connection.execute(`INSERT INTO documents (id ,chatbot_rooms_id, users_id, name, file_url, original, augmented) VALUES (?, ?, ?, ?, ?, ?,?) `, [document.id,document.chatbot_rooms_id, document.users_id, document.name, document.file_url, document.original, document.augmented], (error) => {
        if (error) {
          console.log(" this error is in saveDoc ", error);

          resolve(false);
        } else {
          resolve(true);
        }
      })
    })
  }
  static getDocumentById(id: string):Promise<Documents|undefined> {
    return new Promise((resolve, reject) => {
      DatabaseConnection.connection.query("SELECT * FROM documents WHERE id = ?", [id], (error, results: Documents[]) => {
        if (error) {
          // console.log(" this error is in getDocid ")
          

          resolve(undefined);
        } else {
          resolve(results[0]);
        }
      })
    })
  }
  

}