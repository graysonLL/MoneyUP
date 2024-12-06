const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { Decimal } = require('@prisma/client/runtime/library');
const prisma = new PrismaClient();

// Add new income
router.post('/', async (req, res) => {
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
                category: true // Include category details in response
            }
        });
        
        res.status(201).json(newIncome);
    } catch (error) {
        console.error('Error adding income:', error);
        res.status(500).json({ error: 'Failed to add income' });
    }
});

// Get all incomes for a user
router.get('/user/:userId', async (req, res) => {
    try {
        const user_id = parseInt(req.params.userId);
        const incomes = await prisma.income.findMany({
            where: {
                user_id: user_id
            },
            include: {
                category: true // Include category details in response
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
});

// Get income by ID
router.get('/:incomeId', async (req, res) => {
    try {
        const income_id = parseInt(req.params.incomeId);
        const income = await prisma.income.findUnique({
            where: {
                income_id: income_id
            },
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
});

// Update income
router.put('/:incomeId', async (req, res) => {
    try {
        const income_id = parseInt(req.params.incomeId);
        const { amount, category_id, description, date } = req.body;
        
        const updatedIncome = await prisma.income.update({
            where: {
                income_id: income_id
            },
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
});

// Delete income
router.delete('/:incomeId', async (req, res) => {
    try {
        const income_id = parseInt(req.params.incomeId);
        
        await prisma.income.delete({
            where: {
                income_id: income_id
            }
        });
        
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting income:', error);
        res.status(500).json({ error: 'Failed to delete income' });
    }
});

module.exports = router;