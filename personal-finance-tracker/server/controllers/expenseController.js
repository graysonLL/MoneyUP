const { PrismaClient } = require('@prisma/client');
const { Decimal } = require('@prisma/client/runtime/library');
const prisma = new PrismaClient();

const expenseController = {
    createExpense: async (req, res) => {
        try {
            const { amount, category_id, description, date, user_id } = req.body;
            
            const newExpense = await prisma.expense.create({
                data: {
                    amount: new Decimal(amount),
                    category_id: parseInt(category_id),
                    description,
                    date: new Date(date),
                    user_id: parseInt(user_id)
                },
                include: {
                    category: true
                }
            });
            
            res.status(201).json(newExpense);
        } catch (error) {
            console.error('Error adding expense:', error);
            res.status(500).json({ error: 'Failed to add expense' });
        }
    },

    getUserExpenses: async (req, res) => {
        try {
            const user_id = parseInt(req.params.userId);
            console.log('Fetching expenses for user ID:', user_id);
            
            const expenses = await prisma.expense.findMany({
                where: { user_id },
                include: {
                    category: true
                },
                orderBy: {
                    date: 'desc'
                }
            });
            
            console.log('Found expenses:', expenses);
            res.status(200).json(expenses);
        } catch (error) {
            console.error('Error fetching expenses:', error);
            res.status(500).json({ error: 'Failed to fetch expenses' });
        }
    },

    getExpenseById: async (req, res) => {
        try {
            const expense_id = parseInt(req.params.expenseId);
            const expense = await prisma.expense.findUnique({
                where: { expense_id },
                include: {
                    category: true
                }
            });
            
            if (!expense) {
                return res.status(404).json({ error: 'Expense not found' });
            }
            
            res.status(200).json(expense);
        } catch (error) {
            console.error('Error fetching expense:', error);
            res.status(500).json({ error: 'Failed to fetch expense' });
        }
    },

    updateExpense: async (req, res) => {
        try {
            const expense_id = parseInt(req.params.expenseId);
            const { amount, category_id, description, date } = req.body;
            
            const updatedExpense = await prisma.expense.update({
                where: { expense_id },
                data: {
                    amount: new Decimal(amount),
                    category_id: parseInt(category_id),
                    description,
                    date: new Date(date)
                },
                include: {
                    category: true
                }
            });
            
            res.status(200).json(updatedExpense);
        } catch (error) {
            console.error('Error updating expense:', error);
            res.status(500).json({ error: 'Failed to update expense' });
        }
    },

    deleteExpense: async (req, res) => {
        try {
            const expense_id = parseInt(req.params.expenseId);
            
            await prisma.expense.delete({
                where: { expense_id }
            });
            
            res.status(204).send();
        } catch (error) {
            console.error('Error deleting expense:', error);
            res.status(500).json({ error: 'Failed to delete expense' });
        }
    }
};

module.exports = expenseController;
