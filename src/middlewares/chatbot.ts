import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

const secret=process.env.SECRET;


export const isUserAndChatroom = async (req: Request, res: Response, next: NextFunction) => {
    const { chatbotId } = req.params;
  const token = req.headers.authorization; // token sent from the client (flutter).
  if(!token || typeof token !== "string") return res.status(400).json({ error: "Token is required or type is not correct" });

    if(!secret) return res.status(400).json({ error: "SECTRET is not found" });
      const payload = jwt.verify(token , secret) as { id: string };
      const userId = payload.id;

    if (!chatbotId || typeof chatbotId !== "string" ||
      !userId || typeof userId !== "string" ||
      !req.body.content || typeof req.body.content !== "string"
      ) {
    return res.status(400).json({ error: "Chatbot ID, User ID, and content are required or types are not correct" });
    }
  (req as any).userId=userId;
  (req as any).chatbotId=chatbotId;
    next();

}

