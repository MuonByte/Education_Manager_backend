"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveAIMessage = exports.saveUserMessage = exports.showMessagesByRoom = exports.getMessageById = void 0;
const message_1 = require("../Repos/message");
const crypto_1 = __importDefault(require("crypto"));
const getMessageById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(id) && typeof id !== "string")
        throw new Error("Message not found");
    return yield message_1.MessageRepo.getMessageById(id);
});
exports.getMessageById = getMessageById;
const showMessagesByRoom = (chatbotId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(chatbotId) && typeof chatbotId !== "string")
        throw new Error("Chatbot room not found");
    // console.log('here is were',chatbotId);
    return yield message_1.MessageRepo.getMessagesByTimestamp(chatbotId);
});
exports.showMessagesByRoom = showMessagesByRoom;
const saveUserMessage = (chatbotId, userId, content) => __awaiter(void 0, void 0, void 0, function* () {
    if (content === undefined)
        content = '';
    const message = {
        id: crypto_1.default.randomUUID(),
        chatbot_rooms_id: chatbotId,
        users_id: userId,
        content: content,
        sender: "USER",
        send_at: new Date(),
        constructor: { name: "RowDataPacket" }
    };
    // console.log(message);
    yield message_1.MessageRepo.newMessage(message);
    const messageid = message.id;
    return messageid;
});
exports.saveUserMessage = saveUserMessage;
const saveAIMessage = (chatbotId, content) => __awaiter(void 0, void 0, void 0, function* () {
    const message = {
        id: crypto_1.default.randomUUID(),
        chatbot_rooms_id: chatbotId,
        users_id: "nulfasdfl",
        content: content,
        sender: "AI",
        send_at: new Date(),
        constructor: { name: "RowDataPacket" }
    };
    // console.log(message);
    yield message_1.MessageRepo.newMessage(message);
    const messageid = message.id;
    return messageid;
});
exports.saveAIMessage = saveAIMessage;
