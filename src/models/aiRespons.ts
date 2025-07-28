import { RowDataPacket } from "mysql2";

interface AIResponse extends RowDataPacket {
  id: string;
  chatbot_rooms_id: string;
  prompt:string;
  response: string;

  message_id?: string;
  document_id?:string;
  created_at?: Date;

}

export default AIResponse;