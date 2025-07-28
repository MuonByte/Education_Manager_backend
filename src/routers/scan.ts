import { Router } from "express";
import { uploadAndResponse_Handler } from "../modules/scan";
import { upload } from "../middlewares/scans";
import { isUserAndChatroom } from "../middlewares/chatbot";

const scanRouter = Router();

scanRouter.post("/upload", upload.single("file"), uploadAndResponse_Handler);
// scanRouter.post("/testUpload", upload.single("file"), testUpload);// for testing

export default scanRouter;