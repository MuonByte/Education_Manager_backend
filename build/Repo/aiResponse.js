"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIResponsRepo = void 0;
const db_1 = __importDefault(require("../config/db"));
class AIResponsRepo {
    static getAllAIResponse() {
        return new Promise((resolve, reject) => {
            db_1.default.connection.query("SELECT * FROM ai_response", (error, results) => {
                if (error) {
                    resolve(undefined);
                }
                else {
                    resolve(results[0]);
                }
            });
        });
    }
    static getAIResponseById(id) {
        return new Promise((resolve, reject) => {
            db_1.default.connection.query("SELECT * FROM ai_response WHERE id = ?", [id], (error, results) => {
                if (error) {
                    resolve(undefined);
                }
                else {
                    resolve(results[0]);
                }
            });
        });
    }
    static newAIResponseForMessages(aiResponse) {
        return new Promise((resolve, reject) => {
            db_1.default.connection.execute("INSERT INTO ai_respons (id, chatbot_rooms_id, request, response, message_id) VALUES (?, ?, ?, ?, ? )", [aiResponse.id, aiResponse.chatbot_rooms_id, aiResponse.prompt, aiResponse.response, aiResponse.message_id], (error, results) => {
                if (error) {
                    resolve(undefined);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    static newAIResponseForDocumentsWithMessages(aiResponse) {
        return new Promise((resolve, reject) => {
            db_1.default.connection.execute("INSERT INTO ai_respons (id, chatbot_rooms_id, request, response, document_id,message_id) VALUES (?, ?, ?,?, ?, ? )", [aiResponse.id, aiResponse.chatbot_rooms_id, aiResponse.prompt, aiResponse.response, aiResponse.document_id, aiResponse.message_id], (error, results) => {
                if (error) {
                    resolve(undefined);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    static newAIResponseForDocumentsWithoutMessages(aiResponse) {
        return new Promise((resolve, reject) => {
            db_1.default.connection.execute("INSERT INTO ai_response (id, chatbot_rooms_id, prompt, response, document_id) VALUES (?, ?, ?, ?,  ?)", [aiResponse.id, aiResponse.chatbot_rooms_id, aiResponse.prompt, aiResponse.response, aiResponse.document_id], (error, results) => {
                if (error) {
                    resolve(undefined);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
}
exports.AIResponsRepo = AIResponsRepo;
