import express from "express";
import chatbotRouter from "./routers/chatbot";
import messageRouter from "./routers/message";
import scanRouter from "./routers/scan";
import mockAIRouter from "./mock"; 
import helmet from "helmet";
import cors from "cors";
import hpp from "hpp";
import dotenv from "dotenv";
dotenv.config();



const app = express();
const host: string = "localhost";
const port: number = process.env.PORT ? Number(process.env.PORT) : 3000;


app.use(express.json());

  app.use(helmet());
  app.use(cors());
  app.use(hpp());


app.use(chatbotRouter);
app.use("/api/chatbot", chatbotRouter);
app.use(messageRouter);
app.use("/api/message", messageRouter);
app.use(scanRouter);
app.use('/api/scan', scanRouter);


app.use("/api/ai", mockAIRouter); // خلي الباك يسمع للـ fake AI

app.listen(port, "192.168.1.25", () => {
  console.log(`Server running at http://192.168.1.25:${port}`);
});