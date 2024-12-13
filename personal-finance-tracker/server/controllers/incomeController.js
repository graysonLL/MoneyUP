const { PrismaClient } = require('@prisma/client');
const { Decimal } = require('@prisma/client/runtime/library');
const prisma = new PrismaClient();

const incomeController = {
    createIncome: async (req, res) => {
        try {
            const { amount, category_id, description, date, user_id } = req.body;
            
            const newIncome = await prisma.income.create({
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
            
            res.status(201).json(newIncome);
        } catch (error) {
            console.error('Error adding income:', error);
            res.status(500).json({ error: 'Failed to add income' });
        }
    },

    getUserIncomes: async (req, res) => {
        try {
            const user_id = parseInt(req.params.userId);
            const incomes = await prisma.income.findMany({
                where: { user_id },
                include: {
                    category: true
                },
                orderBy: {
                    date: 'desc'
                }
            });
            
            res.status(200).json(incomes);
        } catch (error) {
            console.error('Error fetching incomes:', error);
            res.status(500).json({ error: 'Failed to fetch incomes' });
        }
    },

    getIncomeById: async (req, res) => {
        try {
            const income_id = parseInt(req.params.incomeId);
            const income = await prisma.income.findUnique({
                where: { income_id },
                include: {
                    category: true
                }
            });
            
            if (!income) {
                return res.status(404).json({ error: 'Income not found' });
            }
            
            res.status(200).json(income);
        } catch (error) {
            console.error('Error fetching income:', error);
            res.status(500).json({ error: 'Failed to fetch income' });
        }
    },

    updateIncome: async (req, res) => {
        try {
            const income_id = parseInt(req.params.incomeId);
            const { amount, category_id, description, date } = req.body;
            
            const updatedIncome = await prisma.income.update({
                where: { income_id },
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
            
            res.status(200).json(updatedIncome);
        } catch (error) {
            console.error('Error updating income:', error);
            res.status(500).json({ error: 'Failed to update income' });
        }
    },

    deleteIncome: async (req, res) => {
        try {
            const income_id = parseInt(req.params.incomeId);
            
            await prisma.income.delete({
                where: { income_id }
            });
            
            res.status(204).send();
        } catch (error) {
            console.error('Error deleting income:', error);
            res.status(500).json({ error: 'Failed to delete income' });
        }
    }
};

module.exports = incomeController; 