// server.js
require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

// Initialize Express app
const app = express();
app.use(express.json());
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

app.get("/", (req, res) => {
  res.send("Welcome to the Personal Finance Tracker API!");
});

// Test route to ensure everything is working
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working" });
});

// Transaction routes (for adding transactions, fetching, etc.)
app.get("/api/transactions", (req, res) => {
  const sql = `SELECT * FROM transactions`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error fetching transactions");
    }
    res.status(200).json(result);
  });
});

// Port listener
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
