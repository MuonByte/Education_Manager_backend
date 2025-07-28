import { RowDataPacket } from "mysql2";
import {ChatbotRoom} from "../models/chatbot";
import DatabaseConfig from "../services/databaseconfig";


export class ChatbotRoomRepo{
  static getChatbotRooms():Promise<ChatbotRoom[]|undefined> {
        return new Promise((resolve, reject) => {
          DatabaseConfig.connection.query("SELECT * FROM chatbot_rooms", (error, results: ChatbotRoom[]) => {
            if (error) {
              resolve(undefined);
            } else {
              resolve(results);
            }
          })
        })
  }
  static findChatbotRoom(id: string):Promise<ChatbotRoom|undefined> {
    return new Promise((resolve, reject) => {
      DatabaseConfig.connection.query("SELECT * FROM chatbot_rooms WHERE id = ?", [id], (error, results: ChatbotRoom[]) => {
        if (error) {
          resolve(undefined);
        } else {
          resolve(results[0]);
        }
      })
    })
  }
  static renameChatbotRoom(id: string, title: string):Promise<boolean|undefined> {
    return new Promise((resolve, reject) => {
      DatabaseConfig.connection.execute("UPDATE chatbot_rooms SET title = ? WHERE id = ?", [title, id], (error, results: ChatbotRoom[]) => {
        if (error) {
          resolve(undefined);
        } else {
          resolve(true) ;
        }
      })
    })
  }

  // static getTimestamp(id: string):Promise<Date|undefined> {
  //   return new Promise((resolve, reject) => {
  //     DatabaseConfig.connection.query<RowDataPacket[]>(
  //   "SELECT created_at FROM chatbot_rooms WHERE id = ?",
  //   [id],
  //   (error, results) => {
  //     if (error) {
  //       resolve(undefined);
  //     } else if (results.length === 0) {
  //       resolve(undefined);
  //     } else {
  //       // Access the `created_at` field from the first row
  //       resolve(new Date(results[0].created_at));
  //     }
  //     })
  //   })
  // }
  static sortTimestamp ():Promise<ChatbotRoom[]|undefined> {
    return new Promise((resolve, reject) => {
      DatabaseConfig.connection.query("SELECT * FROM chatbot_rooms ORDER BY created_at ASC", (error, results: ChatbotRoom[]) => {
        if (error) {
          resolve(undefined);
        } else {
          resolve(results);
        }
      })
    })
  }
  
  static createNewRoom(room: ChatbotRoom):Promise<Boolean|undefined> {
    return new Promise((resolve, reject) => {
      DatabaseConfig.connection.execute("INSERT INTO chatbot_rooms (id,title) VALUES (?,?)", [room.id,room.title], (error) => {
        if (error) {
          console.log("error",error);
          resolve(false);
        } else {
          console.log("success");
          resolve(true);
        }
      })
    })
  }
  
  static getAllRoomsForUser(users_id: string):Promise<ChatbotRoom[]|undefined> {
    return new Promise((resolve, reject) => {
      DatabaseConfig.connection.query(`SELECT DISTINCT cr.* FROM chatbot_rooms cr JOIN message m ON cr.id = m.chatbot_rooms_id WHERE m.sender = 'USER' AND m.users_id = ?;` , [users_id], (error, results: ChatbotRoom[]) => {
        if (error) {
          resolve(undefined);
        } else {
        resolve(results);
      }
    })
  })
}

static getAllInChatroom(id: string):Promise<ChatbotRoom[]|undefined> {
  return new Promise((resolve, reject) => {
    DatabaseConfig.connection.query("SELECT * FROM message , documents WHERE id = ? Order By send_at", [id], (error, results: ChatbotRoom[]) => {
      if (error) {
        resolve(undefined);
      } else {
        resolve(results);
      }
    })
  })
}
  
}

