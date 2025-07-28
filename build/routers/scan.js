"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const scan_1 = require("../modules/scan");
const scans_1 = require("../middlewares/scans");
const scanRouter = (0, express_1.Router)();
scanRouter.post("/upload", scans_1.upload.single("file"), scan_1.uploadAndResponse_Handler);
// scanRouter.post("/testUpload", upload.single("file"), testUpload);// for testing
exports.default = scanRouter;
