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
exports.getAllAIResponse = exports.getAIResponse = exports.makeNewAIResponseForDocumentsWithoutMessage = exports.makeNewAIResponseForDocumentsWithMessage = exports.makeNewAIResponseForMessages = void 0;
const axios_1 = __importDefault(require("axios"));
const aiResponse_1 = require("../Repos/aiResponse");
const crypto_1 = __importDefault(require("crypto"));
const fs_1 = __importDefault(require("fs"));
const form_data_1 = __importDefault(require("form-data"));
// function detectPromptType(text: string): string {
//   const lowerPrompt = text.toLowerCase();
//   if (lowerPrompt.includes("explain") || lowerPrompt.includes("why ") || lowerPrompt.includes("why?")) {
//     return "explanation";
//   } else if (lowerPrompt.includes("quiz") || lowerPrompt.includes("question")|| lowerPrompt.includes('what ') || lowerPrompt.includes('what?') || lowerPrompt.includes('how ') || lowerPrompt.includes('how?')) {
//     return "questions";
//   } else if (lowerPrompt.includes("summarize") || lowerPrompt.includes("summary")) {
//     return "summary";
//   } else if (lowerPrompt.includes("flashcard")) {
//     return "flashcards";
//   } else {
//     return "general"; // default
//   }
// }
// function configrationPrompt( text:string){
//   const type = detectPromptType(text);
//  switch (type) {
//     case 'explanation':
//       return `Explain the following concept in simple terms for a student:\n"${text}"`;
//     case 'summary':
//       return `Summarize the following content in clear bullet points:\n"${text}"`;
//     case 'questions':
//       return `Generate 4 multiple-choice questions (with correct answers) based on the following content:\n"${text}"`;
//     case 'flashcards':
//       return `Convert the following text into flashcards in question-answer format:\n"${text}"`;
//     case 'markdown_clean':
//       return `Convert the following Markdown-formatted content into clean, readable text while keeping important formatting like headings and lists:\n"${text}"`;
//     default:
//       return text;
//   }
// }
const makeNewAIResponseForMessages = (prompt, chatbotRoomId, messageId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (prompt === undefined)
            prompt = '';
        // if(detectPromptType(content) === 'summary' ){
        //   console.log(prompt,detectPromptType(content));
        //    response = await axios.post("http://localhost:3000/api/ai/summarize", {
        //   prompt,
        // });
        // }else if(detectPromptType(content) === 'explanation' ){
        //   console.log(prompt,detectPromptType(content));
        //    response = await axios.post("http://localhost:3000/api/ai/explain", {
        //   prompt,
        // });
        // }else if(detectPromptType(content) === 'flashcards' ){
        //   console.log(prompt,detectPromptType(content));
        //    response = await axios.post("http://localhost:3000/api/ai/flashcards", {
        //   prompt,
        // });
        // }else if(detectPromptType(content) === 'questions' ){
        //   console.log(prompt,detectPromptType(content));
        //    response = await axios.post("http://localhost:3000/api/ai/questions", {
        //   prompt,
        // });
        // }else if(detectPromptType(content) === 'general' ){
        //   console.log(prompt,detectPromptType(content));
        const response = yield axios_1.default.post("http://localhost:3000/api/ai", {
            prompt,
        });
        if (!response)
            return null;
        const data = yield response.data;
        console.log(data);
        const aiResponse = {
            id: crypto_1.default.randomUUID(),
            chatbot_rooms_id: chatbotRoomId,
            prompt: prompt,
            response: data.response,
            // topic: data.topic,
            message_id: messageId,
            created_at: new Date(),
            constructor: { name: "RowDataPacket" },
        };
        console.log(aiResponse);
        yield aiResponse_1.AIResponsRepo.newAIResponseForMessages(aiResponse);
        const responseData = aiResponse.response;
        if (responseData === null) {
            throw new Error("AI response is null");
        }
        return responseData;
    }
    catch (error) {
        console.error("Error generating AI response:", error);
        return null;
    }
});
exports.makeNewAIResponseForMessages = makeNewAIResponseForMessages;
const makeNewAIResponseForDocumentsWithMessage = (uploadedFilePath, prompt, chatbotRoomId, messageId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!fs_1.default.existsSync(uploadedFilePath)) {
            throw new Error("Uploaded file not found");
        }
        const form = new form_data_1.default();
        form.append("file", fs_1.default.createReadStream(uploadedFilePath));
        form.append('prompt', prompt);
        const response = yield axios_1.default.post("http://localhost:3000/api/ai/answer-file", form, {
            headers: form.getHeaders(),
        });
        if (!response)
            return null;
        console.log(response.data);
        const original = yield response.data.original;
        const augmented = yield response.data.augmented;
        const aiResponse = {
            id: crypto_1.default.randomUUID(),
            chatbot_rooms_id: chatbotRoomId,
            prompt: prompt,
            response: augmented,
            message_id: messageId,
            created_at: new Date(),
            constructor: { name: "RowDataPacket" },
        };
        yield aiResponse_1.AIResponsRepo.newAIResponseForDocumentsWithMessages(aiResponse);
        const responseData = aiResponse.response;
        if (responseData === null) {
            throw new Error("AI response is null");
        }
        return { original, augmented };
    }
    catch (error) {
        console.error("Error generating AI response:", error);
        return null;
    }
});
exports.makeNewAIResponseForDocumentsWithMessage = makeNewAIResponseForDocumentsWithMessage;
const makeNewAIResponseForDocumentsWithoutMessage = (uploadedFilePath, prompt, chatbotRoomId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!fs_1.default.existsSync(uploadedFilePath)) {
            throw new Error("Uploaded file not found");
        }
        const form = new form_data_1.default();
        form.append("file", fs_1.default.createReadStream(uploadedFilePath));
        const response = yield axios_1.default.post("http://localhost:3000/api/ai/upload-file", form, {
            headers: form.getHeaders(),
        });
        if (!response)
            return null;
        console.log(response.data);
        const original = yield response.data.original;
        const augmented = yield response.data.augmented;
        const aiResponse = {
            id: crypto_1.default.randomUUID(),
            chatbot_rooms_id: chatbotRoomId,
            prompt: prompt,
            response: augmented,
            // message_id: messageId,
            created_at: new Date(),
            constructor: { name: "RowDataPacket" },
        };
        yield aiResponse_1.AIResponsRepo.newAIResponseForDocumentsWithoutMessages(aiResponse);
        const responseData = aiResponse.response;
        if (responseData === null) {
            throw new Error("AI response is null");
        }
        return { original, augmented };
    }
    catch (error) {
        console.error("Error generating AI response:", error);
        return null;
    }
});
exports.makeNewAIResponseForDocumentsWithoutMessage = makeNewAIResponseForDocumentsWithoutMessage;
const getAIResponse = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const aiResponse = yield aiResponse_1.AIResponsRepo.getAIResponseById(id);
        return aiResponse;
    }
    catch (error) {
        console.error("Error getting AI response:", error);
        return null;
    }
});
exports.getAIResponse = getAIResponse;
const getAllAIResponse = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const aiResponse = yield aiResponse_1.AIResponsRepo.getAllAIResponse();
        return aiResponse;
    }
    catch (error) {
        console.error("Error getting AI response:", error);
        return null;
    }
});
exports.getAllAIResponse = getAllAIResponse;
