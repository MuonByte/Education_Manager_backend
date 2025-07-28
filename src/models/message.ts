import { RowDataPacket } from "mysql2";

interface Message extends RowDataPacket {
  id: string;
  chatbot_rooms_id: string;
  users_id?:string;
  content: string;
  sender: "USER" | "AI"
  send_at?: Date;
}

export {
  Message,
}