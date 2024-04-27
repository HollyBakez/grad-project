import express from 'express';
import Budget from '../models/budgetModel';
import mongoose from 'mongoose';

// get all budgets
const getBudgets = async (req: express.Request, res: express.Response) => {
    const budgets = await Budget.find({}).sort({createdAt: -1});

    res.status(200).json(budgets);
}

// create a new budget
const createBudget = async (req: express.Request, res: express.Response) => {
    const {name, max} = req.body;

    // add doc to db
    try {
        const budget = await Budget.create({name, max});
        res.status(200).json(budget);
    } catch (error: any) {
        res.status(400).json({error: error.message});
    }
}

const deleteBudget = async (req: express.Request, res: express.Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such budget'});
    }
  
    const budget = await Budget.findOneAndDelete({_id: id});
  
    if(!budget) {
      return res.status(400).json({error: 'No such budget'});
    }
  
    res.status(200).json(budget);
}

const updateBudget = async (req: express.Request, res: express.Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such budget'});
    }
  
    const budget = await Budget.findOneAndUpdate({_id: id}, {
        ...req.body
    });
  
    if(!budget) {
      return res.status(400).json({error: 'No such budget'});
    }
  
    res.status(200).json(budget);
}

export {createBudget, getBudgets, deleteBudget, updateBudget};