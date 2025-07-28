import { Request, Response } from "express"
import { getMessageById, saveAIMessage, saveUserMessage, showMessagesByRoom } from "../utils/message";
import {  makeNewAIResponseForMessages } from "../utils/aiResponse";
import jwt from 'jsonwebtoken';
import { time } from "console";

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


const secret=process.env.SECRET;
export async function getMessagesByTimestamp(req:Request, res: Response){
  const chatbotId = req.params.id;
  if (!chatbotId || typeof chatbotId !== "string") {
    return res.status(400).json({ error: "Chatbot ID is required or type is not correct" });
  }
  try {
    const messages = await showMessagesByRoom(chatbotId);
    return res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).json({ error: " server error" });
  }

}
export async function saveUserAndAIMessage_Handler(req: Request, res: Response) {
  const { content } = req.body;
  
  const userId = (req as any).userId;
  const chatbotId = (req as any).chatbotId;


  console.log(chatbotId, userId, content);
  

  try {
    

    const userMessageid = await saveUserMessage(chatbotId, userId, content);
    console.log(userMessageid);
    if (!userMessageid) return res.status(404).json({ error: "User message not saved" });

    await delay(1000);

    const aiResponseText = await makeNewAIResponseForMessages(content, chatbotId ,userMessageid );
    console.log(aiResponseText);
    if(!aiResponseText) return res.status(404).json({ error: "AI response not generated" });
    console.log(aiResponseText);

    await delay(1000);
    
    const aiMessageId = await saveAIMessage(chatbotId, aiResponseText);

    const userMessage = await getMessageById(userMessageid);
    const AIMessage = await getMessageById(aiMessageId);
    

    return res.status(201).json({
      userMessage,
      AIMessage,
    });

  } catch (error) {
    console.error("Error saving user message or getting AI response:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
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
  
