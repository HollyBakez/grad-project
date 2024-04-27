import express from "express";
import Budget from '../models/budgetModel';
import {createBudget, getBudgets, deleteBudget, updateBudget} from '../controllers/budgetController';
const router = express.Router();


// GET all budgets
router.get('/', getBudgets);

// GET a single budget
router.get('/:id', (req: express.Request, res: express.Response) => {

    res.json({mssg: 'GET a single budget'});
})

// POST a new budget
router.post('/', createBudget);

// DELETE a single budget
router.delete('/:id', deleteBudget);

// UPDATE a single budget
router.patch('/:id', updateBudget);


export default router;