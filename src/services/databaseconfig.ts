import mysql from "mysql2";

class DatabaseConfig {

 static connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "EMDB",
  });
  
}

export default DatabaseConfig;