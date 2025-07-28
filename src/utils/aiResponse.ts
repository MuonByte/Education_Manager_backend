import axios from "axios";
import AIResponse from "../models/aiRespons";
import { AIResponsRepo } from "../Repo/aiResponse";
import crypto from "crypto";
import fs from 'fs';
import FormData from "form-data";


// function detectPromptType(text: string): string {
//   const lowerPrompt = text.toLowerCase();

//   if (lowerPrompt.includes("explain") || lowerPrompt.includes("why ") || lowerPrompt.includes("why?")) {
//     return "explanation";
//   } else if (lowerPrompt.includes("quiz") || lowerPrompt.includes("question")|| lowerPrompt.includes('what ') || lowerPrompt.includes('what?') || lowerPrompt.includes('how ') || lowerPrompt.includes('how?')) {
//     return "questions";
//   } else if (lowerPrompt.includes("summarize") || lowerPrompt.includes("summary")) {
//     return "summary";
//   } else if (lowerPrompt.includes("flashcard")) {
//     return "flashcards";
//   } else {
//     return "general"; // default
//   }
// }

// function configrationPrompt( text:string){

//   const type = detectPromptType(text);

//  switch (type) {
//     case 'explanation':
//       return `Explain the following concept in simple terms for a student:\n"${text}"`;
//     case 'summary':
//       return `Summarize the following content in clear bullet points:\n"${text}"`;
//     case 'questions':
//       return `Generate 4 multiple-choice questions (with correct answers) based on the following content:\n"${text}"`;
//     case 'flashcards':
//       return `Convert the following text into flashcards in question-answer format:\n"${text}"`;
//     case 'markdown_clean':
//       return `Convert the following Markdown-formatted content into clean, readable text while keeping important formatting like headings and lists:\n"${text}"`;
//     default:
//       return text;
//   }

// }


export const makeNewAIResponseForMessages = async(prompt: string, chatbotRoomId: string, messageId?: string)=> {
  try {
    if(prompt===undefined) prompt='';
    // if(detectPromptType(content) === 'summary' ){
    //   console.log(prompt,detectPromptType(content));
    //    response = await axios.post(`http://${process.env.AI_IP}:3000/api/ai/summarize`, {
    //   prompt,
    // });
    // }else if(detectPromptType(content) === 'explanation' ){
    //   console.log(prompt,detectPromptType(content));
    //    response = await axios.post(`http://${process.env.AI_IP}:3000/api/ai/explain`, {
    //   prompt,
    // });
    // }else if(detectPromptType(content) === 'flashcards' ){
    //   console.log(prompt,detectPromptType(content));
    //    response = await axios.post(`http://${process.env.AI_IP}:3000/api/ai/flashcards`, {
    //   prompt,
    // });
    // }else if(detectPromptType(content) === 'questions' ){
    //   console.log(prompt,detectPromptType(content));
    //    response = await axios.post(`http://${process.env.AI_IP}:3000/api/ai/questions`, {
    //   prompt,
    // });
    // }else if(detectPromptType(content) === 'general' ){
    //   console.log(prompt,detectPromptType(content));
    
    console.log("prompt : ",prompt);
    const response = await axios.post(`http://${process.env.AI_IP}:${process.env.AI_PORT}/api/ai`, {
      prompt,
    });
    
    console.log("prompt : ",prompt);
    if(!response) return null;
    
    const data = await response.data.answer;
    console.log(data);

    const aiResponse: AIResponse = {
      id: crypto.randomUUID(),
      chatbot_rooms_id: chatbotRoomId,
      prompt: prompt ,
      response: data, 
      message_id: messageId,
      created_at: new Date(),
      constructor: { name: "RowDataPacket" },
    };
    console.log(aiResponse);
    

    await AIResponsRepo.newAIResponseForMessages(aiResponse);

    const responseData = aiResponse.response;  

    if(responseData===null){
      throw new Error("AI response is null");
    }    

    return responseData;

  } catch (error) {    

    console.error("Error generating AI response:", error);    
    return null;

  }

}



export const makeNewAIResponseForDocumentsWithMessage = async(uploadedFilePath: string , prompt: string, chatbotRoomId: string, messageId?: string)=> {
  try {
    prompt = prompt.toString();
    if (!fs.existsSync(uploadedFilePath)) {
      throw new Error("Uploaded file not found");
    }
  
    const form = new FormData();
    form.append("file", fs.createReadStream(uploadedFilePath));
    console.log("berfore upload file");
    const documentsResponse = await axios.post(`http://${process.env.AI_IP}:${process.env.AI_PORT}/api/ai/upload-file`, form, {
      headers: form.getHeaders(),
    });
    console.log("after upload file");

    const response = await axios.post(`http://${process.env.AI_IP}:${process.env.AI_PORT}/api/ai`, {
      prompt,
    });
    console.log("after ai");

    if(!response) return null;

    console.log(response.data);

    const original = await documentsResponse.data.original;
    const augmented = await documentsResponse.data.augmented;
    const answer = await response.data.answer;

    const promptString = `
      
      ${augmented.headings.join('\n')}
      
      ${augmented.bullets.join('\n')}

      ${augmented.other_text.join('\n')}

      `.trim();

    const aiResponse: AIResponse = {
      id: crypto.randomUUID(),
      chatbot_rooms_id: chatbotRoomId,
      prompt: prompt,
      response: answer, 
      message_id: messageId,
      created_at: new Date(),
      constructor: { name: "RowDataPacket" },
    };
  

    await AIResponsRepo.newAIResponseForDocumentsWithMessages(aiResponse);

    const responseData = aiResponse.response;  

    if(responseData===null){
      throw new Error("AI response is null");
    }    

    return {original,promptString};

  } catch (error) {    

    console.error("Error generating AI response:", error);    
    return null;

  }

}

export const makeNewAIResponseForDocumentsWithoutMessage = async(uploadedFilePath: string , prompt: string, chatbotRoomId: string)=> {
  try {

    if (!fs.existsSync(uploadedFilePath)) {
      throw new Error("Uploaded file not found");
    }
    

    const form = new FormData();
    form.append("file", fs.createReadStream(uploadedFilePath));


       const response = await axios.post(`http://${process.env.AI_IP}:${process.env.AI_PORT}/api/ai/upload-file`,form, {
        headers: form.getHeaders(),
      });

    if(!response) return null;
    console.log(response.data);
    const original = await response.data.original;
    const augmented = await response.data.augmented;

    const promptString = `
      
      ${augmented.headings.join('\n')}
      
      ${augmented.bullets.join('\n')}

      ${augmented.other_text.join('\n')}

      `.trim();


    const aiResponse: AIResponse = {
      id: crypto.randomUUID(),
      chatbot_rooms_id: chatbotRoomId,
      prompt: prompt,
      response: promptString, 

      created_at: new Date(),
      constructor: { name: "RowDataPacket" },
    };
  

    await AIResponsRepo.newAIResponseForDocumentsWithoutMessages(aiResponse);

    const responseData = aiResponse.response;  

    if(responseData===null){
      throw new Error("AI response is null");
    }    

    return {original,promptString};

  } catch (error) {    

    console.error("Error generating AI response:", error);    
    return null;

  }

}

export const getAIResponse = async (id: string) => {
  try {
    const aiResponse = await AIResponsRepo.getAIResponseById(id);
    return aiResponse;
  } catch (error) {
    console.error("Error getting AI response:", error);
    return null;
  }
};


export const getAllAIResponse = async () => {
  try {
    const aiResponse = await AIResponsRepo.getAllAIResponse();
    return aiResponse;
  } catch (error) {
    console.error("Error getting AI response:", error);
    return null;
  }
};