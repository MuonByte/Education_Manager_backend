import { RowDataPacket } from "mysql2";


interface ChatbotRoom extends RowDataPacket {
  id: string;
  title: string;
  created_at?: Date;
}


export {
  ChatbotRoom,
} 