const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Move preset categories here
const presetCategories = [
  // Income categories
  { name: 'Salary', type: 'income' },
  { name: 'Freelance', type: 'income' },
  { name: 'Investments', type: 'income' },
  { name: 'Rental Income', type: 'income' },
  { name: 'Bonus', type: 'income' },
  { name: 'Side Hustle', type: 'income' },
  { name: 'Gift', type: 'income' },
  
  // Essential Expenses
  { name: 'Rent/Mortgage', type: 'expense' },
  { name: 'Utilities', type: 'expense' },
  { name: 'Groceries', type: 'expense' },
  { name: 'Transportation', type: 'expense' },
  { name: 'Insurance', type: 'expense' },
  { name: 'Healthcare', type: 'expense' },
  
  // Lifestyle
  { name: 'Dining Out', type: 'expense' },
  { name: 'Entertainment', type: 'expense' },
  { name: 'Shopping', type: 'expense' },
  { name: 'Travel', type: 'expense' },
  { name: 'Hobbies', type: 'expense' },
  
  // Personal Care
  { name: 'Health & Fitness', type: 'expense' },
  { name: 'Personal Care', type: 'expense' },
  { name: 'Clothing', type: 'expense' },
  
  // Home & Family
  { name: 'Home Maintenance', type: 'expense' },
  { name: 'Pet Care', type: 'expense' },
  { name: 'Child Care', type: 'expense' },
  { name: 'Education', type: 'expense' },
  
  // Technology & Services
  { name: 'Phone', type: 'expense' },
  { name: 'Internet', type: 'expense' },
  { name: 'Streaming Services', type: 'expense' },
  { name: 'Software Subscriptions', type: 'expense' },
  
  // Financial
  { name: 'Savings', type: 'expense' },
  { name: 'Investments', type: 'expense' },
  { name: 'Debt Payment', type: 'expense' },
  { name: 'Banking Fees', type: 'expense' },
  
  // Miscellaneous
  { name: 'Gifts', type: 'expense' },
  { name: 'Donations', type: 'expense' },
  { name: 'Other', type: 'expense' }
];

const authController = {
  register: async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      console.log("Registration attempt:", { firstName, lastName, email });

      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await prisma.$transaction(async (prisma) => {
        const user = await prisma.user.create({
          data: {
            first_name: firstName,
            last_name: lastName,
            email,
            password: hashedPassword,
          },
        });

        const categoryPromises = presetCategories.map(category => 
          prisma.category.create({
            data: {
              name: category.name,
              type: category.type,
              user_id: user.user_id
            }
          })
        );

        await Promise.all(categoryPromises);
        return user;
      });

      const token = jwt.sign(
        { userId: result.user_id },
        process.env.JWT_SECRET || "fallback-secret-key",
        { expiresIn: "24h" }
      );

      res.status(201).json({
        token,
        user: {
          id: result.user_id,
          email: result.email,
          firstName: result.first_name,
          lastName: result.last_name,
        },
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

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
  },

  getUser: async (req, res) => {
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
  },

  updateProfile: async (req, res) => {
    try {
      const { firstName, lastName, email } = req.body;
      const userId = req.user.id; // Get from auth middleware

      console.log('Updating profile for user:', userId);
      console.log('Update data:', { firstName, lastName, email });

      const updatedUser = await prisma.user.update({
        where: {
          id: parseInt(userId)
        },
        data: {
          firstName,
          lastName,
          email
        }
      });

      // Remove sensitive information
      const { password, ...userWithoutPassword } = updatedUser;
      
      console.log('Profile updated successfully:', userWithoutPassword);
      res.status(200).json({ user: userWithoutPassword });
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ error: 'Failed to update profile' });
    }
  }
};

module.exports = authController;
