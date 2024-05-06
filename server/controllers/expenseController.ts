import express from 'express';
import Expense from '../models/expenseModel';
import mongoose from 'mongoose';

// get all expenses
const getExpenses = async (req: express.Request, res: express.Response) => {
    const expenses = await Expense.find({}).sort({createdAt: -1});

    res.status(200).json(expenses);
}

// get a single expense
const getExpense = async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such expense'})
    }
  
    const expense = await Expense.findById(id);
  
    if (!expense) {
      return res.status(404).json({error: 'No such expense'});
    }
  
    res.status(200).json(expense);
  }

// create a new expense
const createExpense = async (req: express.Request, res: express.Response) => {
    const {id, budgetId, amount, description} = req.body;

    // add doc to db
    try {
        const expense = await Expense.create({id, budgetId, amount, description});
        res.status(200).json(expense);
    } catch (error: any) {
        res.status(400).json({error: error.message});
    }
}

// delete a single expense
const deleteExpense = async (req: express.Request, res: express.Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such expense'});
    }
  
    const expense = await Expense.findOneAndDelete({ id: id});
  
    if(!expense) {
      return res.status(400).json({error: 'No such expense'});
    }
  
    res.status(200).json(expense);
}

// update a expense
const updateExpense = async (req: express.Request, res: express.Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such expense'});
    }
  
    const expense = await Expense.findOneAndUpdate({ id: id}, {
        ...req.body
    });
  
    if(!expense) {
      return res.status(400).json({error: 'No such expense'});
    }
  
    res.status(200).json(expense);
}

export {createExpense, getExpenses, getExpense, deleteExpense, updateExpense};