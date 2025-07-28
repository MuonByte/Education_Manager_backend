import { Router } from "express";
import { getMessagesByTimestamp, saveUserAndAIMessage_Handler } from "../modules/message";
import { isUserAndChatroom } from "../middlewares/chatbot";

const messageRouter = Router();

messageRouter.get("/:id",isUserAndChatroom ,getMessagesByTimestamp);  
messageRouter.post("/:chatbotId", saveUserAndAIMessage_Handler);


export default messageRouter;