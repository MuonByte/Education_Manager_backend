import { Request, Response } from "express";
import { createNewRoom, getChatbotRoom, listChatbotRooms, renameChatbotRoom } from "../utils/chatbot";
import { showMessagesByRoom } from "../utils/message";
import jwt from 'jsonwebtoken';

const secret:string|undefined =process.env.SECRET;

export async function createRoom_Handler(req:Request, res:Response){
  const {title} = req.body;
  if(!title || typeof title !== "string") {
    return res.status(400).json({ error: "Title is required or type is not correct" });
  }
  try {
    const newRoom = await createNewRoom(title);
    console.log("newRoom is:",newRoom); //----------

    const room = await getChatbotRoom(newRoom);
    console.log(room);//----------------

    return res.status(201).json(room);
  } catch (error) {
    console.error("Error creating room:", error);
    return res.status(500).json({ error: " server error" });
  }
}

export async function listChatbotRooms_Handler(req: Request, res: Response) {
  
  const token = req.headers.authorization; 
  
  if(!token || typeof token !== "string") return res.status(400).json({ error: "Token is required or type is not correct" });
  
  if(!secret) return res.status(400).json({ error: "SECTRET is not found" });
  
  const payload = jwt.verify(token , secret) as { id: string };
  const userId = payload.id;
  

  if (!userId || typeof userId !== "string") {
    return res.status(400).json({ error: "User ID is required or type is not correct " });
  }


  try {
    const rooms = await listChatbotRooms(userId);
    console.log(rooms);//-----------------

    return res.status(200).json(rooms);

  } catch (error) {
    console.error("Error listing chatbot rooms:", error);
    return res.status(500).json({ error: " server error" });
  }
}

export async function renameChatbotRoom_Handler(req: Request, res: Response) {

  const { title } = req.body;
  
    const token = req.headers.authorization; 
  if(!token || typeof token !== "string") return res.status(400).json({ error: "Token is required or type is not correct" });
  
  if(!secret) return res.status(400).json({ error: "SECTRET is not found" });
    const payload = jwt.verify(token , secret) as { id: string };
    const id = payload.id;

  if (!id || typeof id !== "string" || !title || typeof title !== "string") {
    return res.status(400).json({ error: "ID or type is not correct title are required or type is not correct " });
  }
  try {
    const result = await renameChatbotRoom(id, title);
    console.log(result);//-----------------------
    
    if (result) {
      return res.status(200).json({ message: "Chatbot room renamed successfully" });
    } else {
      return res.status(404).json({ error: "Chatbot room not found" });
    }
  } catch (error) {
    console.error("Error renaming chatbot room:", error);
    return res.status(500).json({ error: " server error" });
  }
}

export async function getChatbotRoomById_Handler(req: Request, res: Response) {
  const roomId = req.params.id;
  if (!roomId || typeof roomId !== "string") {
    return res.status(400).json({ error: "Room ID is required or type is not correct " });
  }
  try {

    const room = await getChatbotRoom(roomId);
    console.log(room)//-----------------

    const chatbotRoomMessages = await showMessagesByRoom(roomId);
    console.log(`this is  : `, chatbotRoomMessages);//-----------------
    if (room) {
      return res.status(200).json({...room, messages: chatbotRoomMessages});
    } else {
      return res.status(404).json({ error: "Chatbot room not found" });
    }
  } catch (error) {
    console.error("Error fetching chatbot room:", error);
    return res.status(500).json({ error: " server error" });
  }
}