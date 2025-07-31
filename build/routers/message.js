"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const message_1 = require("../modules/message");
const chatbot_1 = require("../middlewares/chatbot");
const messageRouter = (0, express_1.Router)();
messageRouter.get("/:id", message_1.getMessagesByTimestamp);
messageRouter.post("/:chatbotId", chatbot_1.isUserAndChatroom, message_1.saveUserAndAIMessage_Handler);
exports.default = messageRouter;
