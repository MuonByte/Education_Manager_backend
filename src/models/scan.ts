import { RowDataPacket } from "mysql2";

interface Documents extends RowDataPacket {
  id: string;
  chatbot_rooms_id: string;
  users_id:string;
  name: string;
  file_url: string;
  original: string;
  augmented: string;
  created_at?: Date;
}
export default Documents;