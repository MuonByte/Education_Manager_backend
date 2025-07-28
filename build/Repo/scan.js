"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentRepo = void 0;
const db_1 = __importDefault(require("../config/db"));
class DocumentRepo {
    static getDocumentsByTimestamp(id) {
        return new Promise((resolve, reject) => {
            db_1.default.connection.query("SELECT * FROM document WHERE chatbot_rooms_id = ? ORDER BY created_at ASC", [id], (error, results) => {
                if (error) {
                    // console.log(" this error is in getDoc ")
                    resolve(undefined);
                }
                else {
                    resolve(results);
                }
            });
        });
    }
    static getDocumentsUrl(id) {
        return new Promise((resolve, reject) => {
            db_1.default.connection.query("SELECT file_url FROM documents WHERE chatbots_room_id = ?", [id], (error, results) => {
                if (error) {
                    // console.log(" this error is in getDocurl ")
                    resolve(undefined);
                }
                else {
                    resolve(results[0].file_url);
                }
            });
        });
    }
    static seveResultDocument(document) {
        return new Promise((resolve, reject) => {
            console.log("id:", document.id, "chatbot_rooms_id:", document.chatbot_rooms_id, "users_id:", document.users_id, "name:", document.name, "file_url:", document.file_url, "original:", document.original, "augmented:", document.augmented);
            db_1.default.connection.execute(`INSERT INTO documents (id ,chatbot_rooms_id, users_id, name, file_url, original, augmented) VALUES (?, ?, ?, ?, ?, ?,?) `, [document.id, document.chatbot_rooms_id, document.users_id, document.name, document.file_url, document.original, document.augmented], (error) => {
                if (error) {
                    console.log(" this error is in saveDoc ", error);
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    static getDocumentById(id) {
        return new Promise((resolve, reject) => {
            db_1.default.connection.query("SELECT * FROM documents WHERE id = ?", [id], (error, results) => {
                if (error) {
                    // console.log(" this error is in getDocid ")
                    resolve(undefined);
                }
                else {
                    resolve(results[0]);
                }
            });
        });
    }
}
exports.DocumentRepo = DocumentRepo;
