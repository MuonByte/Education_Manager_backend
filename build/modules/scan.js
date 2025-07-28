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
exports.uploadAndResponse_Handler = uploadAndResponse_Handler;
const message_1 = require("../utils/message");
const aiResponse_1 = require("../utils/aiResponse");
const scan_1 = require("../utils/scan");
function uploadAndResponse_Handler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { content } = req.body;
        if (!req.file)
            return res.status(400).json({ error: "File is required" });
        const uploadedFilePath = req.file.path;
        const fileName = req.file.originalname;
        const userId = req.userId;
        const chatbotId = req.chatbotId;
        try {
            if (content !== "") {
                const userMessageid = yield (0, message_1.saveUserMessage)(chatbotId, userId, content);
                if (!userMessageid)
                    return res.status(404).json({ error: "User message not saved" });
                const aiResponseText = yield (0, aiResponse_1.makeNewAIResponseForDocumentsWithMessage)(uploadedFilePath, content, chatbotId, userMessageid);
                if (!aiResponseText)
                    return res.status(404).json({ error: "AI response not generated" });
                const { original, augmented } = aiResponseText;
                yield (0, scan_1.saveDocument)(chatbotId, userId, uploadedFilePath, fileName, original, augmented);
                const aiMessageId = yield (0, message_1.saveAIMessage)(chatbotId, augmented);
                const userMessage = yield (0, message_1.getMessageById)(userMessageid);
                const AIMessage = yield (0, message_1.getMessageById)(aiMessageId);
                return res.status(201).json({
                    userMessage,
                    AIMessage,
                });
            }
            else {
                const aiResponseText = yield (0, aiResponse_1.makeNewAIResponseForDocumentsWithoutMessage)(uploadedFilePath, '', chatbotId);
                if (!aiResponseText)
                    return res.status(404).json({ error: "AI response not generated" });
                const { original, augmented } = aiResponseText;
                yield (0, scan_1.saveDocument)(chatbotId, userId, uploadedFilePath, fileName, original, augmented);
                const aiMessageId = yield (0, message_1.saveAIMessage)(chatbotId, augmented);
                const AIMessage = yield (0, message_1.getMessageById)(aiMessageId);
                return res.status(201).json({
                    AIMessage,
                });
            }
        }
        catch (error) {
            console.error("Error saving user message or getting AI response:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    });
}
// export async function testUpload(req: Request, res: Response) {
//   const { content } = req.body;
//   if(!req.file) return res.status(400).json({ error: "File is required" });
//   const uploadedFilePath = req.file.path;
//   return res.status(201).json({ uploadedFilePath , content });
// }
