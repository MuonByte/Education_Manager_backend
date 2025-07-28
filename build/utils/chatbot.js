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
exports.createNewRoom = exports.renameChatbotRoom = exports.listChatbotRooms = exports.getChatbotRoom = void 0;
const chatbot_1 = require("../Repo/chatbot");
const crypto_1 = __importDefault(require("crypto"));
const getChatbotRoom = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield chatbot_1.ChatbotRoomRepo.findChatbotRoom(id);
});
exports.getChatbotRoom = getChatbotRoom;
const listChatbotRooms = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield chatbot_1.ChatbotRoomRepo.getAllRoomsForUser(id);
});
exports.listChatbotRooms = listChatbotRooms;
const renameChatbotRoom = (id, title) => __awaiter(void 0, void 0, void 0, function* () {
    return yield chatbot_1.ChatbotRoomRepo.renameChatbotRoom(id, title);
});
exports.renameChatbotRoom = renameChatbotRoom;
const createNewRoom = (title) => __awaiter(void 0, void 0, void 0, function* () {
    const newroom = {
        id: crypto_1.default.randomUUID(),
        title: title,
        created_at: new Date(),
        constructor: { name: "RowDataPacket" }
    };
    yield chatbot_1.ChatbotRoomRepo.createNewRoom(newroom);
    const newRoom = newroom.id;
    return newRoom;
});
exports.createNewRoom = createNewRoom;
