import AIResponse from "../models/aiRespons";
import DatabaseConfig from "../services/databaseconfig";


export class AIResponsRepo{
  static getAllAIResponse():Promise<AIResponse|undefined> {
    return new Promise((resolve, reject) => {
      DatabaseConfig.connection.query("SELECT * FROM ai_response", (error, results: AIResponse[]) => {
        if (error) {
          resolve(undefined);
        } else {
          resolve(results[0]);
        }
      })
    });
  }
  static getAIResponseById(id: string):Promise<AIResponse|undefined> {
    return new Promise((resolve, reject) => {
      DatabaseConfig.connection.query("SELECT * FROM ai_response WHERE id = ?", [id], (error, results: AIResponse[]) => {
        if (error) {
          resolve(undefined);
        } else {
          resolve(results[0]);
        }
      })
    });
  }
  static newAIResponseForMessages(aiResponse: AIResponse):Promise<boolean|undefined> {
    return new Promise((resolve, reject) => {
      // console.log('id:',aiResponse.id , 'chatbot_rooms_id:',aiResponse.chatbot_rooms_id, 'prompt:',aiResponse.prompt, 'response:',aiResponse.response, "message_id:",aiResponse.message_id); ;
      DatabaseConfig.connection.execute("INSERT INTO ai_respons (id, chatbot_rooms_id, request, response, message_id) VALUES (?, ?, ?, ?, ? )", [aiResponse.id, aiResponse.chatbot_rooms_id, aiResponse.prompt, aiResponse.response,aiResponse.message_id], (error, results) => {
        if (error) {
          // console.log("error ai: ", error);
          
          resolve(undefined);
        } else {
          resolve(true);
        }
      })
    });
  }


  static newAIResponseForDocumentsWithMessages(aiResponse: AIResponse):Promise<boolean|undefined> {
    return new Promise((resolve, reject) => {
      // console.log('id:',aiResponse.id , 'chatbot_rooms_id:',aiResponse.chatbot_rooms_id, 'prompt:',aiResponse.prompt, 'response:',aiResponse.response, "message_id:",aiResponse.message_id); ;
      DatabaseConfig.connection.execute("INSERT INTO ai_respons (id, chatbot_rooms_id, request, response, document_id,message_id) VALUES (?, ?, ?,?, ?, ? )", [aiResponse.id, aiResponse.chatbot_rooms_id, aiResponse.prompt, aiResponse.response,aiResponse.document_id,aiResponse.message_id], (error, results) => {
        if (error) {
          // console.log("error ai: ", error);
          
          resolve(undefined);
        } else {
          resolve(true);
        }
      })
    });
  }



  static newAIResponseForDocumentsWithoutMessages(aiResponse: AIResponse):Promise<boolean|undefined> {
    return new Promise((resolve, reject) => {
      DatabaseConfig.connection.execute("INSERT INTO ai_response (id, chatbot_rooms_id, prompt, response, document_id) VALUES (?, ?, ?, ?,  ?)", [aiResponse.id, aiResponse.chatbot_rooms_id, aiResponse.prompt, aiResponse.response,  aiResponse.document_id], (error, results) => {
        if (error) {
          resolve(undefined);
        } else {
          resolve(true);
        }
      })
    });
  }
  
  
}