import express from "express";
import Expense from '../models/expenseModel';
import {createExpense, getExpenses, getExpense, getBudgetExpenses, deleteExpense, updateExpense, updateExpensesToUncategorized} from '../controllers/expenseController';
const router = express.Router();

// expense routes


// GET Routes

// GET all expenses
router.get('/', getExpenses);

// GET a single expense
router.get('/expense/:id', getExpense);

// GET all expenses for a given budget id
router.get('/budgetId/:budgetId',getBudgetExpenses);

// POST Routes

// POST a new expense
router.post('/', createExpense);

// DELETE Routes

// DELETE a single expense
router.delete('/:id', deleteExpense);

// UPDATE Routes

// UPDATE a single expense
router.patch('/:id', updateExpense);

// UPDATE all expenses budgetId to Uncategorized based on budgetId param
router.patch('/:budgetId/uncategorized-expense', updateExpensesToUncategorized);

export default router;