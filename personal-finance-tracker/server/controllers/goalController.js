const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    createGoal: async (req, res) => {
        try {
            const { name, target_amount, deadline, user_id } = req.body;

            // Validate required fields
            if (!name || !target_amount || !user_id) {
                return res.status(400).json({ 
                    error: 'Missing required fields',
                    details: 'name, target_amount, and user_id are required'
                });
            }

            // Validate target_amount is a valid number
            const parsedAmount = parseFloat(target_amount);
            if (isNaN(parsedAmount) || parsedAmount <= 0) {
                return res.status(400).json({ 
                    error: 'Invalid target amount',
                    details: 'Target amount must be a positive number'
                });
            }

            const newGoal = await prisma.goal.create({
                data: {
                    name,
                    target_amount: new Prisma.Decimal(parsedAmount.toString()),
                    deadline: deadline ? new Date(deadline) : null,
                    achieved: false,
                    user: {
                        connect: {
                            user_id: parseInt(user_id)
                        }
                    }
                },
            });

            res.status(201).json(newGoal);
        } catch (error) {
            console.error('Error creating goal:', error);
            res.status(500).json({ 
                error: 'Failed to create goal',
                details: error.message
            });
        }
    },

    getUserGoals: async (req, res) => {
        try {
            const user_id = parseInt(req.params.userId);

            const goals = await prisma.goal.findMany({
                where: { user_id },
                orderBy: { created_at: 'desc' },
            });

            res.status(200).json(goals);
        } catch (error) {
            console.error('Error fetching user goals:', error);
            res.status(500).json({ error: 'Failed to fetch goals' });
        }
    },

    getGoalById: async (req, res) => {
        try {
            const goal_id = parseInt(req.params.goalId);

            const goal = await prisma.goal.findUnique({
                where: { goal_id },
            });

            if (!goal) {
                return res.status(404).json({ error: 'Goal not found' });
            }

            res.status(200).json(goal);
        } catch (error) {
            console.error('Error fetching goal:', error);
            res.status(500).json({ error: 'Failed to fetch goal' });
        }
    },

    updateGoal: async (req, res) => {
        try {
            const goal_id = parseInt(req.params.goalId);
            const { name, target_amount, deadline, achieved } = req.body;

            // If marking as achieved, create expense entry
            if (achieved) {
                // Find the "Other" category for this user
                const otherCategory = await prisma.category.findFirst({
                    where: {
                        name: 'Other',
                        type: 'expense',
                        user_id: parseInt(req.body.user_id)
                    }
                });

                if (!otherCategory) {
                    throw new Error('Other category not found');
                }

                // Create the expense entry
                await prisma.expense.create({
                    data: {
                        amount: parseFloat(target_amount),
                        description: `Goal achieved: ${name}`,
                        date: new Date(),
                        category: {
                            connect: {
                                category_id: otherCategory.category_id
                            }
                        },
                        user: {
                            connect: {
                                user_id: parseInt(req.body.user_id)
                            }
                        }
                    }
                });
            }

            // Update the goal
            const updateData = {
                name,
                target_amount: target_amount ? parseFloat(target_amount) : undefined,
                deadline: deadline ? new Date(deadline) : null,
            };

            if (achieved) {
                updateData.achieved = true;
                updateData.achieved_at = new Date();
            }

            const updatedGoal = await prisma.goal.update({
                where: { goal_id },
                data: updateData,
            });

            res.status(200).json(updatedGoal);
        } catch (error) {
            console.error('Error updating goal:', error);
            res.status(500).json({ error: 'Failed to update goal' });
        }
    },

    deleteGoal: async (req, res) => {
        try {
            const goal_id = parseInt(req.params.goalId);

            await prisma.goal.delete({
                where: { goal_id },
            });

            res.status(200).json({ message: 'Goal deleted successfully' });
        } catch (error) {
            console.error('Error deleting goal:', error);
            res.status(500).json({ error: 'Failed to delete goal' });
        }
    },
};
