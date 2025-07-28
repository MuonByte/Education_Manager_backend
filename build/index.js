"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chatbot_1 = __importDefault(require("./routers/chatbot"));
const message_1 = __importDefault(require("./routers/message"));
const scan_1 = __importDefault(require("./routers/scan"));
const mock_1 = __importDefault(require("./mock"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const hpp_1 = __importDefault(require("hpp"));
const app = (0, express_1.default)();
const host = "localhost";
const port = process.env.PORT ? Number(process.env.PORT) : 3000;
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use((0, hpp_1.default)());
app.use(chatbot_1.default);
app.use("/api/chatbot", chatbot_1.default);
app.use(message_1.default);
app.use("/api/message", message_1.default);
app.use(scan_1.default);
app.use('/api/scan', scan_1.default);
app.use("/api/ai", mock_1.default); // خلي الباك يسمع للـ fake AI
app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
});
