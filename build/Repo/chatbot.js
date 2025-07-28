"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatbotRoomRepo = void 0;
const db_1 = __importDefault(require("../config/db"));
class ChatbotRoomRepo {
    static getChatbotRooms() {
        console.log("DB_USER", process.env.DB_USER);
        return new Promise((resolve, reject) => {
            db_1.default.connection.query("SELECT * FROM chatbot_rooms", (error, results) => {
                if (error) {
                    resolve(undefined);
                }
                else {
                    resolve(results);
                }
            });
        });
    }
    static findChatbotRoom(id) {
        return new Promise((resolve, reject) => {
            console.log("DB_USER", process.env.DB_USER);
            db_1.default.connection.query("SELECT * FROM chatbot_rooms WHERE id = ?", [id], (error, results) => {
                if (error) {
                    resolve(undefined);
                }
                else {
                    resolve(results[0]);
                }
            });
        });
    }
    static renameChatbotRoom(id, title) {
        return new Promise((resolve, reject) => {
            console.log("DB_USER", process.env.DB_USER);
            db_1.default.connection.execute("UPDATE chatbot_rooms SET title = ? WHERE id = ?", [title, id], (error, results) => {
                if (error) {
                    resolve(undefined);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    // static getTimestamp(id: string):Promise<Date|undefined> {
    //   return new Promise((resolve, reject) => {
    //     DatabaseConnection.connection.query<RowDataPacket[]>(
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
    static sortTimestamp() {
        return new Promise((resolve, reject) => {
            console.log("DB_USER", process.env.DB_USER);
            db_1.default.connection.query("SELECT * FROM chatbot_rooms ORDER BY created_at ASC", (error, results) => {
                if (error) {
                    resolve(undefined);
                }
                else {
                    resolve(results);
                }
            });
        });
    }
    static createNewRoom(room) {
        return new Promise((resolve, reject) => {
            console.log("DB_USER", process.env.DB_USER);
            db_1.default.connection.execute("INSERT INTO chatbot_rooms (id,title) VALUES (?,?)", [room.id, room.title], (error) => {
                if (error) {
                    console.log("error", error);
                    resolve(false);
                }
                else {
                    console.log("success");
                    resolve(true);
                }
            });
        });
    }
    static getAllRoomsForUser(users_id) {
        return new Promise((resolve, reject) => {
            console.log("DB_USER", process.env.DB_USER);
            db_1.default.connection.query(`SELECT DISTINCT cr.* FROM chatbot_rooms cr JOIN message m ON cr.id = m.chatbot_rooms_id WHERE m.sender = 'USER' AND m.users_id = ?;`, [users_id], (error, results) => {
                if (error) {
                    resolve(undefined);
                }
                else {
                    resolve(results);
                }
            });
        });
    }
    static getAllInChatroom(id) {
        return new Promise((resolve, reject) => {
            db_1.default.connection.query("SELECT * FROM message , documents WHERE id = ? Order By send_at", [id], (error, results) => {
                if (error) {
                    resolve(undefined);
                }
                else {
                    resolve(results);
                }
            });
        });
    }
}
exports.ChatbotRoomRepo = ChatbotRoomRepo;
