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
exports.createRoom_Handler = createRoom_Handler;
exports.listChatbotRooms_Handler = listChatbotRooms_Handler;
exports.renameChatbotRoom_Handler = renameChatbotRoom_Handler;
exports.getChatbotRoomById_Handler = getChatbotRoomById_Handler;
const chatbot_1 = require("../utils/chatbot");
const message_1 = require("../utils/message");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.SECRET;
function createRoom_Handler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title } = req.body;
        if (!title || typeof title !== "string") {
            return res.status(400).json({ error: "Title is required or type is not correct" });
        }
        try {
            const newRoom = yield (0, chatbot_1.createNewRoom)(title);
            console.log("newRoom is:", newRoom); //----------
            const room = yield (0, chatbot_1.getChatbotRoom)(newRoom);
            console.log(room); //----------------
            return res.status(201).json(room);
        }
        catch (error) {
            console.error("Error creating room:", error);
            return res.status(500).json({ error: " server error" });
        }
    });
}
function listChatbotRooms_Handler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.headers.authorization;
        if (!token || typeof token !== "string")
            return res.status(400).json({ error: "Token is required or type is not correct" });
        if (!secret)
            return res.status(400).json({ error: "SECTRET is not found" });
        const payload = jsonwebtoken_1.default.verify(token, secret);
        const userId = payload.id;
        if (!userId || typeof userId !== "string") {
            return res.status(400).json({ error: "User ID is required or type is not correct " });
        }
        try {
            const rooms = yield (0, chatbot_1.listChatbotRooms)(userId);
            console.log(rooms); //-----------------
            return res.status(200).json(rooms);
        }
        catch (error) {
            console.error("Error listing chatbot rooms:", error);
            return res.status(500).json({ error: " server error" });
        }
    });
}
function renameChatbotRoom_Handler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title } = req.body;
        const token = req.headers.authorization;
        if (!token || typeof token !== "string")
            return res.status(400).json({ error: "Token is required or type is not correct" });
        if (!secret)
            return res.status(400).json({ error: "SECTRET is not found" });
        const payload = jsonwebtoken_1.default.verify(token, secret);
        const id = payload.id;
        if (!id || typeof id !== "string" || !title || typeof title !== "string") {
            return res.status(400).json({ error: "ID or type is not correct title are required or type is not correct " });
        }
        try {
            const result = yield (0, chatbot_1.renameChatbotRoom)(id, title);
            console.log(result); //-----------------------
            if (result) {
                return res.status(200).json({ message: "Chatbot room renamed successfully" });
            }
            else {
                return res.status(404).json({ error: "Chatbot room not found" });
            }
        }
        catch (error) {
            console.error("Error renaming chatbot room:", error);
            return res.status(500).json({ error: " server error" });
        }
    });
}
function getChatbotRoomById_Handler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const roomId = req.params.id;
        if (!roomId || typeof roomId !== "string") {
            return res.status(400).json({ error: "Room ID is required or type is not correct " });
        }
        try {
            const room = yield (0, chatbot_1.getChatbotRoom)(roomId);
            console.log(room); //-----------------
            const chatbotRoomMessages = yield (0, message_1.showMessagesByRoom)(roomId);
            console.log(`this is  : `, chatbotRoomMessages); //-----------------
            if (room) {
                return res.status(200).json(Object.assign(Object.assign({}, room), { messages: chatbotRoomMessages }));
            }
            else {
                return res.status(404).json({ error: "Chatbot room not found" });
            }
        }
        catch (error) {
            console.error("Error fetching chatbot room:", error);
            return res.status(500).json({ error: " server error" });
        }
    });
}
