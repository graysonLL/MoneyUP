const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


module.exports = {
    createGoal: async (req, res) => {
        try {
            const { name, targetAmount, targetDate, currentAmount, user_id } = req.body;

            const newGoal = await prisma.goal.create({
                data: {
                    name,
                    target_amount: parseFloat(targetAmount),
                    current_amount: parseFloat(currentAmount) || 0,
                    deadline: targetDate ? new Date(targetDate) : null,
                    user_id: parseInt(user_id)
                },
            });

            res.status(201).json(newGoal);
        } catch (error) {
            console.error('Error creating goal:', error);
            res.status(500).json({ error: 'Failed to create goal' });
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
            const { name, targetAmount, currentAmount, targetDate } = req.body;

            const updatedGoal = await prisma.goal.update({
                where: { goal_id },
                data: {
                    name,
                    target_amount: parseFloat(targetAmount),
                    current_amount: parseFloat(currentAmount),
                    deadline: targetDate ? new Date(targetDate) : null,
                },
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
