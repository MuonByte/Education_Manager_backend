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
exports.getDocumentsByTimestampForChatroom = getDocumentsByTimestampForChatroom;
exports.getDocumentsUrl = getDocumentsUrl;
exports.getDocumentById = getDocumentById;
exports.saveDocument = saveDocument;
const scan_1 = require("../Repo/scan");
function getDocumentsByTimestampForChatroom(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const scans = yield scan_1.DocumentRepo.getDocumentsByTimestamp(id);
            return scans;
        }
        catch (error) {
            console.error("Error :", error);
            return null;
        }
    });
}
function getDocumentsUrl(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const scans = yield scan_1.DocumentRepo.getDocumentsUrl(id);
            return scans;
        }
        catch (error) {
            console.error("Error :", error);
            return null;
        }
    });
}
function getDocumentById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const scans = yield scan_1.DocumentRepo.getDocumentById(id);
            return scans;
        }
        catch (error) {
            console.error("Error :", error);
            return null;
        }
    });
}
function saveDocument(chatbotRoomId, userid, file_url, name, original, augmented) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("in services document ", chatbotRoomId);
        try {
            const newDocument = {
                id: crypto.randomUUID(),
                chatbot_rooms_id: chatbotRoomId,
                users_id: userid,
                file_url: file_url,
                name: name,
                original: original,
                augmented: augmented,
                created_at: new Date(),
                constructor: { name: "RowDataPacket" }
            };
            yield scan_1.DocumentRepo.seveResultDocument(newDocument);
            return true;
        }
        catch (error) {
            console.error("Error :", error);
            return false;
        }
    });
}
