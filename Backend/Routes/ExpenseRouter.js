const express = require('express');
const { fetchExpenses, addExpenses, deleteExpenses } = require('../Controllers/ExpenseController');
const router = express.Router();



// fetch expenses with uid
router.get('/',fetchExpenses);
// add expenses
router.post('/add',addExpenses);
// delete function
router.delete('/:expenseId',deleteExpenses);


module.exports = router;