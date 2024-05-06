import express from "express";
import Budget from '../models/budgetModel';
import {createBudget, getBudgets, getBudget, deleteBudget, updateBudget} from '../controllers/budgetController';
const router = express.Router();

// budget routes

// GET all budgets
router.get('/', getBudgets);

// GET a single budget
router.get('/:id', getBudget);

// POST a new budget
router.post('/', createBudget);

// DELETE a single budget
router.delete('/:id', deleteBudget);

// UPDATE a single budget
router.patch('/:id', updateBudget);

export default router;