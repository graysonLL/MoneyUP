const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all categories for the authenticated user
router.get('/', async (req, res) => {
    try {
        const user_id = req.userId; // Get userId from auth middleware
        const categories = await prisma.category.findMany({
            where: {
                user_id: user_id
            },
            orderBy: {
                name: 'asc'
            }
        });
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

// Get category by ID
router.get('/:categoryId', async (req, res) => {
    try {
        const category_id = parseInt(req.params.categoryId);
        const user_id = req.userId; // Get userId from auth middleware

        const category = await prisma.category.findFirst({
            where: {
                AND: [
                    { category_id: category_id },
                    { user_id: user_id }
                ]
            }
        });
        
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        
        res.status(200).json(category);
    } catch (error) {
        console.error('Error fetching category:', error);
        res.status(500).json({ error: 'Failed to fetch category' });
    }
});

// Create new category
router.post('/', async (req, res) => {
    try {
        const { name, type } = req.body;
        const user_id = req.userId; // Get userId from auth middleware

        // Validate type is either 'income' or 'expense'
        if (!['income', 'expense'].includes(type)) {
            return res.status(400).json({ error: 'Invalid category type. Must be either "income" or "expense"' });
        }

        const newCategory = await prisma.category.create({
            data: {
                name,
                type,
                user_id: user_id
            }
        });
        res.status(201).json(newCategory);
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ error: 'Failed to create category' });
    }
});

// Update category
router.put('/:categoryId', async (req, res) => {
    try {
        const category_id = parseInt(req.params.categoryId);
        const { name, type } = req.body;
        const user_id = req.userId; // Get userId from auth middleware
        
        // Verify the category belongs to the user
        const existingCategory = await prisma.category.findFirst({
            where: {
                AND: [
                    { category_id: category_id },
                    { user_id: user_id }
                ]
            }
        });

        if (!existingCategory) {
            return res.status(404).json({ error: 'Category not found or unauthorized' });
        }

        // Validate type is either 'income' or 'expense'
        if (type && !['income', 'expense'].includes(type)) {
            return res.status(400).json({ error: 'Invalid category type. Must be either "income" or "expense"' });
        }
        
        const updatedCategory = await prisma.category.update({
            where: {
                category_id: category_id
            },
            data: {
                name,
                type
            }
        });
        
        res.status(200).json(updatedCategory);
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ error: 'Failed to update category' });
    }
});

// Delete category
router.delete('/:categoryId', async (req, res) => {
    try {
        const category_id = parseInt(req.params.categoryId);
        const user_id = req.userId; // Get userId from auth middleware
        
        // Verify the category belongs to the user
        const existingCategory = await prisma.category.findFirst({
            where: {
                AND: [
                    { category_id: category_id },
                    { user_id: user_id }
                ]
            }
        });

        if (!existingCategory) {
            return res.status(404).json({ error: 'Category not found or unauthorized' });
        }

        await prisma.category.delete({
            where: {
                category_id: category_id
            }
        });
        
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ error: 'Failed to delete category' });
    }
});

module.exports = router;