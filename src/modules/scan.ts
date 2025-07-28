import { Request, Response } from "express"
import { getMessageById, saveAIMessage, saveUserMessage } from "../utils/message";
import {   makeNewAIResponseForDocumentsWithMessage, makeNewAIResponseForDocumentsWithoutMessage,} from "../utils/aiResponse";
import jwt from 'jsonwebtoken';
import { saveDocument } from "../utils/scan";



export async function uploadAndResponse_Handler(req: Request, res: Response) {
  const { content } = req.body;
  if(!req.file) return res.status(400).json({ error: "File is required" });
  const uploadedFilePath = req.file.path;
  const fileName = req.file.originalname;




  const userId = (req as any).userId;
  const chatbotId = (req as any).chatbotId;

  

  
  try {
    
      if (content !==""){

        const userMessageid = await saveUserMessage(chatbotId, userId, content);
        if (!userMessageid) return res.status(404).json({ error: "User message not saved" });

        
        const aiResponseText = await makeNewAIResponseForDocumentsWithMessage(uploadedFilePath ,content, chatbotId ,userMessageid );
        if(!aiResponseText) return res.status(404).json({ error: "AI response not generated" });
        
        const {original, promptString} = aiResponseText;
        
        await saveDocument(chatbotId, userId, uploadedFilePath,fileName ,original, promptString);
        
        const aiMessageId = await saveAIMessage(chatbotId, promptString);

        const userMessage = await getMessageById(userMessageid);
        const AIMessage = await getMessageById(aiMessageId);
        
        return res.status(201).json({
          
          userMessage,
          AIMessage,
        });
      }
        

      else{
        const aiResponseText = await makeNewAIResponseForDocumentsWithoutMessage(uploadedFilePath ,'', chatbotId );
        if(!aiResponseText) return res.status(404).json({ error: "AI response not generated" });
        const {original, promptString} = aiResponseText;
        
        await saveDocument(chatbotId, userId, uploadedFilePath,fileName ,original, promptString);


        const aiMessageId = await saveAIMessage(chatbotId, promptString);
        const AIMessage = await getMessageById(aiMessageId);
        return res.status(201).json({
          
          AIMessage,
        });
      }

  } catch (error) {
    console.error("Error saving user message or getting AI response:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// export async function testUpload(req: Request, res: Response) {

//   const { content } = req.body;
  
//   if(!req.file) return res.status(400).json({ error: "File is required" });
  
//   const uploadedFilePath = req.file.path;
  
//   return res.status(201).json({ uploadedFilePath , content });
// }