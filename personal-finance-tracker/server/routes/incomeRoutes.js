const express = require('express');
const router = express.Router();
const incomeController = require('../controllers/incomeController');

router.post('/', incomeController.createIncome);
router.get('/user/:userId', incomeController.getUserIncomes);
router.get('/:incomeId', incomeController.getIncomeById);
router.put('/:incomeId', incomeController.updateIncome);
router.delete('/:incomeId', incomeController.deleteIncome);

module.exports = router;