import { Message } from "../models/message";
import { MessageRepo } from "../Repos/message";
import crypto from 'crypto';


export const getMessageById = async (id: string) => {
  
  if(!(id) && typeof id !== "string" ) throw new Error("Message not found");
  return await MessageRepo.getMessageById(id);
}
export const showMessagesByRoom = async (chatbotId: string) => {

  if(!(chatbotId) && typeof chatbotId !== "string" ) throw new Error("Chatbot room not found");
  // console.log('here is were',chatbotId);
  
  return await MessageRepo.getMessagesByTimestamp(chatbotId);
}


export const saveUserMessage =async (chatbotId: string, userId: string, content: string) => {
  if(content===undefined) content='';
  const message: Message = {
    id: crypto.randomUUID(),
    chatbot_rooms_id: chatbotId,
    users_id: userId,
    content: content,
    sender: "USER",
    send_at: new Date(),
    constructor: { name: "RowDataPacket" }
  };
  // console.log(message);
  await MessageRepo.newMessage(message);
   const messageid= message.id;
  return messageid;
}
export const saveAIMessage = async (chatbotId: string, content: string) =>{
  

  const message: Message = {
    id: crypto.randomUUID(),
    chatbot_rooms_id: chatbotId,
    users_id: "nulfasdfl",
    content: content,
    sender: "AI",
    send_at: new Date(),
    constructor: { name: "RowDataPacket" }
  };
  // console.log(message);
  
  await MessageRepo.newMessage(message);
   const messageid= message.id;
  return messageid;
}

