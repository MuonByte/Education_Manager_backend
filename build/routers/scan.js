"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const scan_1 = require("../modules/scan");
const scans_1 = require("../middlewares/scans");
const chatbot_1 = require("../middlewares/chatbot");
const scanRouter = (0, express_1.Router)();
scanRouter.post("/upload", scans_1.upload.single("file"), chatbot_1.isUserAndChatroom, scan_1.uploadAndResponse_Handler);
exports.default = scanRouter;
