const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const { authenticateToken } = require('../middleware/auth');
// console.log(expenseController);

// Create a new expense
router.post('/', expenseController.createExpense);

// Get all expenses for a specific user
router.get('/user/:userId', expenseController.getUserExpenses);

// Get a specific expense by ID
router.get('/:expenseId', expenseController.getExpenseById);

// Update a specific expense
router.put('/:expenseId', expenseController.updateExpense);

// Delete a specific expense
router.delete('/:expenseId', expenseController.deleteExpense);

module.exports = router; 