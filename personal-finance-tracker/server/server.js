// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Initialize Express app
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to the Personal Finance Tracker API!");
});

// Test route to ensure everything is working
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working" });
});

// Transaction routes (for adding transactions, fetching, etc.)
app.get("/api/transactions", async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany();
    res.status(200).json(transactions);
  } catch (err) {
    console.error("Error fetching transactions:", err);
    res.status(500).json({ error: "Error fetching transactions" });
  }
});

// Port listener
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Ensure to disconnect Prisma client when the server is closed
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
