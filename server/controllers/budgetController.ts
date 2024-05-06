import express from 'express';
import Budget from '../models/budgetModel';
import mongoose from 'mongoose';

// get all budgets
const getBudgets = async (req: express.Request, res: express.Response) => {
    const budgets = await Budget.find({}).sort({createdAt: -1});

    res.status(200).json(budgets);
}

// get a single budget
const getBudget = async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such budget'})
    }
  
    const budget = await Budget.findById(id);
  
    if (!budget) {
      return res.status(404).json({error: 'No such budget'});
    }
  
    res.status(200).json(budget);
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

// delete a single budget
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

// update a budget
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


// get all expenses for a given budget
const getExpenses = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such budget'})
  }

  const budget = await Budget.findById(id);

  if (!budget) {
    return res.status(404).json({error: 'No such budget'});
  }

  const budgets = await Budget.find({_id: id}, { expenses: 1, _id: 0 }).sort({createdAt: -1});

  res.status(200).json(budgets);
}

// update a budget by creating a new expense for it
const createExpense = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const {amount, description} = req.body;
  const newObjExpense = { amount: amount, description: description };

  // check first if budget exists in collection db
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such budget'});
  }

  // find the budget and update the budget's expenses with a new entry
  try {
      const budget = await Budget.findOneAndUpdate({_id: id}, 
        {$push: {expenses: newObjExpense}}, {new: true});
      res.status(200).json(budget);
  } catch (error: any) {
      res.status(400).json({error: error.message});
  }
}

// delete a single expense from a budget
// const deleteExpense = async (req: express.Request, res: express.Response) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({error: 'No such budget'});
//   }

//   const budget = await Budget.findOneAndDelete({_id: id});

//   if(!budget) {
//     return res.status(400).json({error: 'No such budget'});
//   }

//   res.status(200).json(budget);
// }

// TODO: update a single expense from a budget
// add update route logic here



export {createBudget, getBudgets, getBudget, deleteBudget, updateBudget, getExpenses, createExpense};