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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessagesByTimestamp = getMessagesByTimestamp;
exports.saveUserAndAIMessage_Handler = saveUserAndAIMessage_Handler;
const message_1 = require("../utils/message");
const aiResponse_1 = require("../utils/aiResponse");
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const secret = process.env.SECRET;
function getMessagesByTimestamp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const chatbotId = req.params.id;
        if (!chatbotId || typeof chatbotId !== "string") {
            return res.status(400).json({ error: "Chatbot ID is required or type is not correct" });
        }
        try {
            const messages = yield (0, message_1.showMessagesByRoom)(chatbotId);
            return res.status(200).json(messages);
        }
        catch (error) {
            console.error("Error fetching messages:", error);
            return res.status(500).json({ error: " server error" });
        }
    });
}
function saveUserAndAIMessage_Handler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { content } = req.body;
        const userId = req.userId;
        const chatbotId = req.chatbotId;
        console.log(chatbotId, userId, content);
        try {
            const userMessageid = yield (0, message_1.saveUserMessage)(chatbotId, userId, content);
            console.log(userMessageid);
            if (!userMessageid)
                return res.status(404).json({ error: "User message not saved" });
            yield delay(1000);
            const aiResponseText = yield (0, aiResponse_1.makeNewAIResponseForMessages)(content, chatbotId, userMessageid);
            console.log(aiResponseText);
            if (!aiResponseText)
                return res.status(404).json({ error: "AI response not generated" });
            console.log(aiResponseText);
            yield delay(1000);
            const aiMessageId = yield (0, message_1.saveAIMessage)(chatbotId, aiResponseText);
            const userMessage = yield (0, message_1.getMessageById)(userMessageid);
            const AIMessage = yield (0, message_1.getMessageById)(aiMessageId);
            return res.status(201).json({
                userMessage,
                AIMessage,
            });
        }
        catch (error) {
            console.error("Error saving user message or getting AI response:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    });
}
// export async function saveAIMessage_Handler(req: Request, res: Response) {
//   const { chatbotId } = req.params;
//   const { content } = req.body;
//   if (!chatbotId || typeof chatbotId !== "string" || !content || typeof content !== "string") {
//     return res.status(400).json({ error: "Chatbot ID and content are required or type is not correct" });
//   }
//   try {
//     const message = await saveAIMessage(chatbotId, content);
//     return res.status(201).json(message);
//   } catch (error) {
//     console.error("Error saving AI message:", error);
//     return res.status(500).json({ error: " server error" });
//   }
// }
