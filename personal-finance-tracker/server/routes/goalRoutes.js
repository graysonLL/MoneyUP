const express = require('express');
const router = express.Router();
const goalController = require("../controllers/goalController");


router.post('/', goalController.createGoal);


router.get('/user/:userId', goalController.getUserGoals);

// Get a specific goal by ID
router.get('/:goalId', goalController.getGoalById);

// Update a specific goal
router.put('/:goalId', goalController.updateGoal);

// Delete a specific goal
router.delete('/:goalId', goalController.deleteGoal);

module.exports = router; 