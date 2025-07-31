"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class DatabaseConnection {
}
DatabaseConnection.connection = mysql2_1.default.createPool({
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST7,
});
console.log("Database connection created", process.env.DB_NAME, " ", process.env.DB_USER, " ", process.env.DB_PASSWORD, " ", process.env.DB_HOST);
exports.default = DatabaseConnection;
