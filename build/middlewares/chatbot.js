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
exports.isUserAndChatroom = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET;
const isUserAndChatroom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatbotId } = req.params;
    console.log("chatbotId");
    let token;
    const authHeader = req.headers.authorization;
    console.log("authHeader: ", authHeader);
    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    }
    console.log("token: ", token);
    if (!token || typeof token !== "string")
        return res.status(400).json({ error: "Token is required or type is not correct" });
    if (!secret)
        return res.status(400).json({ error: "SECTRET is not found" });
    const payload = jsonwebtoken_1.default.verify(token, secret);
    const userId = payload.id;
    console.log("payload: ", payload, "\nuserId: ", userId);
    if (!chatbotId || typeof chatbotId !== "string" ||
        !userId || typeof userId !== "string" ||
        !req.body.content || typeof req.body.content !== "string") {
        return res.status(400).json({ error: "Chatbot ID, User ID, and content are required or types are not correct" });
    }
    req.userId = userId;
    console.log("req.userId: ", req.userId);
    req.chatbotId = chatbotId;
    console.log("req.chatbotId: ", req.chatbotId);
    next();
});
exports.isUserAndChatroom = isUserAndChatroom;
