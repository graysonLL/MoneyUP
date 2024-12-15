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
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' });
      }

      const token = authHeader.split(' ')[1];
      
    
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key');
      const userId = decoded.userId; 

 
      const { firstName, lastName, email } = req.body;

    
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });

      if (existingUser && existingUser.user_id !== userId) {
        return res.status(400).json({ error: 'Email already in use' });
      }


      const updatedUser = await prisma.user.update({
        where: { 
          user_id: userId  
        },
        data: {
          first_name: firstName, 
          last_name: lastName,   
          email: email
        }
      });

     
      const { password: _, ...userWithoutPassword } = updatedUser;


      const transformedUser = {
        id: updatedUser.user_id,
        firstName: updatedUser.first_name,
        lastName: updatedUser.last_name,
        email: updatedUser.email
      };

    
      const newToken = jwt.sign(
        { userId: updatedUser.user_id },  
        process.env.JWT_SECRET || 'fallback-secret-key',
        { expiresIn: '24h' }
      );

      res.json({
        user: transformedUser,  
      });

    } catch (error) {
      console.error('Profile update error:', error);
      res.status(500).json({ error: 'Failed to update profile' });
    }
  }
};

module.exports = authController;
