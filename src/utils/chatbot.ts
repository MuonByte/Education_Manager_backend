import { ChatbotRoom } from "../models/chatbot";
import { ChatbotRoomRepo } from "../Repo/chatbot";
import crypto from 'crypto';

export const getChatbotRoom= async(id:string)=>{
  return await ChatbotRoomRepo.findChatbotRoom(id);
}
export const listChatbotRooms = async (id: string) => {
  return  await ChatbotRoomRepo.getAllRoomsForUser(id);
}

export const renameChatbotRoom = async (id: string, title: string) => {
  
  return await ChatbotRoomRepo.renameChatbotRoom(id, title);
} 

export const createNewRoom = async (title :string) => {
  
  const newroom: ChatbotRoom = {
    id: crypto.randomUUID(),
    title: title,
    created_at: new Date(),
    constructor: { name: "RowDataPacket" }
  };
  await ChatbotRoomRepo.createNewRoom(newroom);
  const newRoom = newroom.id;
  return newRoom;
}
