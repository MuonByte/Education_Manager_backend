import { Message } from "../models/message";

import DatabaseConnection from "../config/db";

export class MessageRepo{
  
  static getMessageById(id: string):Promise<Message|undefined> {
    return new Promise((resolve, reject) => {
      DatabaseConnection.connection.query("SELECT * FROM message WHERE id = ?", [id], (error, results: Message[]) => {
        if (error) {
          resolve(undefined);
        } else {
          resolve(results[0]);
        }
      })
    })
  }
  static getMessagesByTimestamp(id: string):Promise<Message[]|undefined> {
    return new Promise((resolve, reject) => {
      DatabaseConnection.connection.query("SELECT * FROM message WHERE chatbot_rooms_id = ? ORDER BY send_at ASC", [id], (error, results: Message[]) => {
        if (error) {
          // console.log("error:   ", error);
          resolve(undefined);
        } else {
          resolve(results);
        }
      })
    })
  }

  static newMessage(message: Message):Promise<Boolean|undefined> {
    return new Promise((resolve, reject) => {
      // console.log("message:", message.chatbot_rooms_id, message.users_id, message.content, message.sender);
      DatabaseConnection.connection.execute("INSERT INTO message (id , chatbot_rooms_id, users_id, content, sender) VALUES (?, ? , ?, ?, ?)", [message.id, message.chatbot_rooms_id, message.users_id, message.content, message.sender], (error) => {
        if (error) {
          // console.log("NOT SAVE error", error);
          resolve(false);
        } else {
          resolve(true);
        }
        
      })
    })
  }


}
