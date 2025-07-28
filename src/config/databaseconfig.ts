import mysql from "mysql2";

class DatabaseConnection {
  static connection = mysql.createPool({
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
  });
  
}

export default DatabaseConnection;