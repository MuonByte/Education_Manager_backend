"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chatbot_1 = require("../modules/chatbot");
const chatbotRouter = (0, express_1.Router)();
chatbotRouter.post("/create", chatbot_1.createRoom_Handler); // creates a new room
chatbotRouter.get("/rooms", chatbot_1.listChatbotRooms_Handler); // list all rooms
chatbotRouter.get("/room/:id", chatbot_1.getChatbotRoomById_Handler); // get room by id
chatbotRouter.put("/rename", chatbot_1.renameChatbotRoom_Handler); //  rename a room
chatbotRouter.delete("/delete/:id", chatbot_1.deleteChatRoom); //delete room by id
exports.default = chatbotRouter;
