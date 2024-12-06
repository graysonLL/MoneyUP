const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    console.log("Registration attempt:", { firstName, lastName, email }); // Debug log

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        email,
        password: hashedPassword,
      },
    });

    // Create JWT token
    const token = jwt.sign(
      { userId: user.user_id },
      process.env.JWT_SECRET || "fallback-secret-key", // Add a fallback secret key for testing
      { expiresIn: "24h" }
    );

    res.status(201).json({
      token,
      user: {
        id: user.user_id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
      },
    });
  } catch (error) {
    console.error("Registration error:", error); // Debug log
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user.user_id },
      process.env.JWT_SECRET || "fallback-secret-key",
      { expiresIn: "24h" }
    );

    res.json({
      token,
      user: {
        id: user.user_id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/user", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "fallback-secret-key"
    );

    const user = await prisma.user.findUnique({
      where: { user_id: decoded.userId },
      select: {
        first_name: true,
        last_name: true,
        email: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
    });
  } catch (error) {
    console.error("User fetch error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
});

router.put("/update-profile", async (req, res) => {
  console.log("Update profile route hit", req.body);

  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "fallback-secret-key"
    );
    console.log("Decoded token:", decoded);

    const updatedUser = await prisma.user.update({
      where: { user_id: decoded.userId },
      data: {
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
      },
    });
    console.log("User updated:", updatedUser);

    res.json({
      message: "Profile updated successfully",
      user: {
        firstName: updatedUser.first_name,
        lastName: updatedUser.last_name,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    console.error("Update error:", error);
    res
      .status(400)
      .json({ message: "Failed to update profile", error: error.message });
  }
});

module.exports = router;
