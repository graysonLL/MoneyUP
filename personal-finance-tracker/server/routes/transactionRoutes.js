const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const authMiddleware = require('../middleware/auth');

router.get('/user/:userId', authMiddleware, transactionController.getTransactions);

module.exports = router;
