import express from "express";
import Expense from '../models/expenseModel';
import {createExpense, getExpenses, getExpense, deleteExpense, updateExpense} from '../controllers/expenseController';
const router = express.Router();

// expense routes

// GET all expenses
router.get('/', getExpenses);

// GET a single expense
router.get('/:id', getExpense);

// POST a new expense
router.post('/', createExpense);

// DELETE a single expense
router.delete('/:id', deleteExpense);

// UPDATE a single expense
router.patch('/:id', updateExpense);

export default router;