// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = express();

app.use(express.json());
app.use(cors());

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const incomeRoutes = require("./routes/incomeRoutes");
app.use("/api/income", incomeRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Personal Finance Tracker API!");
});

app.get("/api/test", (req, res) => {
  res.json({ message: "API is working" });
});

app.get("/api/transactions", async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany();
    res.status(200).json(transactions);
  } catch (err) {
    console.error("Error fetching transactions:", err);
    res.status(500).json({ error: "Error fetching transactions" });
  }
});

app.get("/api/categories", async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json(categories);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ error: "Error fetching categories" });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
