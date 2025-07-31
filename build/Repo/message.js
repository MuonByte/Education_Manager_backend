"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageRepo = void 0;
const db_1 = __importDefault(require("../config/db"));
class MessageRepo {
    static getMessageById(id) {
        return new Promise((resolve, reject) => {
            db_1.default.connection.query("SELECT * FROM message WHERE id = ?", [id], (error, results) => {
                if (error) {
                    resolve(undefined);
                }
                else {
                    resolve(results[0]);
                }
            });
        });
    }
    static getMessagesByTimestamp(id) {
        return new Promise((resolve, reject) => {
            db_1.default.connection.query("SELECT * FROM message WHERE chatbot_rooms_id = ? ORDER BY send_at ASC", [id], (error, results) => {
                if (error) {
                    resolve(undefined);
                }
                else {
                    resolve(results);
                }
            });
        });
    }
    static newMessage(message) {
        return new Promise((resolve, reject) => {
            db_1.default.connection.execute("INSERT INTO message (id , chatbot_rooms_id, users_id, content, sender) VALUES (?, ? , ?, ?, ?)", [message.id, message.chatbot_rooms_id, message.users_id, message.content, message.sender], (error) => {
                if (error) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
}
exports.MessageRepo = MessageRepo;
