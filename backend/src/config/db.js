import mysql2 from "mysql2/promise";

export const pool = mysql2.createPool({
  host: "sql12.freesqldatabase.com",
  user: "sql12801518",
  password: "yubjyNRAyS",
  database: "sql12801518",
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});

export const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Database connected successfully.");
    connection.release();
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};
