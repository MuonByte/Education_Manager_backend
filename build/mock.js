"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const scans_1 = require("./middlewares/scans");
const mockAIRouter = (0, express_1.Router)();
mockAIRouter.post("/summarize", (req, res) => {
    const { prompt } = req.body;
    res.json({
        result: `This is a fake summary for: "${prompt}"`
    });
});
mockAIRouter.post("/upload-file", scans_1.upload.single("file"), (req, res) => {
    const file = req.file;
    if (!file)
        return res.status(400).json({ error: "File is required" });
    res.json({
        original: `this is an original upload of the file with ${file.originalname}`,
        augmented: `this is an augmented upload of the file with${file.originalname} `,
    });
});
mockAIRouter.post("/answer-file", scans_1.upload.single("file"), (req, res) => {
    const { prompt } = req.body;
    const file = req.file;
    if (!file)
        return res.status(400).json({ error: "File is required" });
    res.json({
        original: `this is an original answer of the file with prompt: "${prompt}" , for file: ${file.originalname}`,
        augmented: `this is an augmented answer of the file with prompt: "${prompt}" for file: ${file.originalname}`,
    });
});
mockAIRouter.post("/explain", (req, res) => {
    const { prompt } = req.body;
    res.json({
        result: `This is a fake explanation for: "${prompt}"`
    });
});
mockAIRouter.post("/flashcards", (req, res) => {
    res.json({
        flashcards: [
            { question: "Q1", answer: "A1" },
            { question: "Q2", answer: "A2" }
        ]
    });
});
mockAIRouter.post("/questions", (req, res) => {
    res.json({
        questions: [
            "What is the main point?",
            "Can you explain paragraph 2?"
        ]
    });
});
mockAIRouter.post("/", (req, res) => {
    const { prompt } = req.body;
    res.json({
        answer: `This is a general AI response. ${prompt}`
    });
});
exports.default = mockAIRouter;
