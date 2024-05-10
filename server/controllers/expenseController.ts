import express from 'express';
import Expense from '../models/expenseModel';
import mongoose from 'mongoose';

// get all expenses
const getExpenses = async (req: express.Request, res: express.Response) => {
    const expenses = await Expense.find({}).sort({createdAt: -1});

    res.status(200).json(expenses);
}

// get budget expenses
// get all expenses given a budget id
const getBudgetExpenses = async (req: express.Request, res: express.Response) => {
  const { budgetId } = req.params;
  const expenses = await Expense.find({budgetId: budgetId});
  if (!expenses) {
    return res.status(404).json({error: 'No expenses for this budget id'});
  }

  res.status(200).json(expenses);
}

// get a single expense
const getExpense = async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such expense'});
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

    const expense = await Expense.findOneAndDelete({ id: id});
  
    if(!expense) {
      const errorLog = `No expense for the provided id of ${id}`;
      return res.status(404).json({error: errorLog});
    }
  
    res.status(200).json(expense);
}

// update a single expense
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

// update expenses' budgetId to "Uncategorized" after deletion of its parent category Budget
const updateExpensesToUncategorized = async (req: express.Request, res: express.Response) => {
  const { budgetId } = req.params;

  const foundExpenses = await Expense.find({budgetId: budgetId});
  if (!foundExpenses) {
    return res.status(404).json({error: 'No expenses for this budget id'});
  }

  const updatedExpenses = await Expense.updateMany({ budgetId: budgetId }, {budgetId : "Uncategorized"});


  res.status(200).json(updatedExpenses);
}

export {createExpense, getExpenses, getExpense, getBudgetExpenses, deleteExpense, updateExpense, updateExpensesToUncategorized};