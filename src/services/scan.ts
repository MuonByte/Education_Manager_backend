import Documents from "../models/scan";
import { DocumentRepo } from "../Repos/scan";


export async function getDocumentsByTimestampForChatroom(id: string) {

  try {
    const scans = await DocumentRepo.getDocumentsByTimestamp(id);
    return scans;
  } catch (error) {
    console.error("Error :", error);
    return null;
  }
  
}


export async function getDocumentsUrl(id: string) {

  try {
    const scans = await DocumentRepo.getDocumentsUrl(id);
    return scans;
  } catch (error) {
    console.error("Error :", error);
    return null;
  }
  
}

export async function getDocumentById(id: string) {

  try {
    const scans = await DocumentRepo.getDocumentById(id);
    return scans;
  } catch (error) {
    console.error("Error :", error);
    return null;
  }
  
}

export async function saveDocument(chatbotRoomId: string,userid: string, file_url: string,name: string,original: string,augmented: string) {
  console.log("in services document ",chatbotRoomId)
  try{
    const newDocument: Documents = { 
        id: crypto.randomUUID(),
       chatbot_rooms_id: chatbotRoomId,
       users_id: userid,
       file_url: file_url,
       name: name,
       original: original,
       augmented: augmented,
       created_at: new Date() ,
       constructor: { name: "RowDataPacket" }
      };
    await DocumentRepo.seveResultDocument(newDocument);
    return true;
  }
  catch (error) {
    console.error("Error :", error);
    return false;
  }

}