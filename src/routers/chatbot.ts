import { Router } from "express";
import { createRoom_Handler, getChatbotRoomById_Handler, listChatbotRooms_Handler, renameChatbotRoom_Handler } from "../modules/chatbot";


const chatbotRouter = Router();

chatbotRouter.post("/create", createRoom_Handler); // creates a new room
chatbotRouter.get("/rooms", listChatbotRooms_Handler); // list all rooms
chatbotRouter.get("/room/:id", getChatbotRoomById_Handler); // get room by id
chatbotRouter.put("/rename", renameChatbotRoom_Handler); //  rename a room


export default chatbotRouter;