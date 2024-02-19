import React, { useContext, useState } from 'react';
import BudgetCard from '../BudgetCard/BudgetCard';
import { v4 as uuidV4 } from 'uuid';
import useLocalStorage  from '../../hooks/useLocalStorage';


const BudgetsContext = React.createContext(null);

// Data structure for 
// Budget
//{
//     id:
//     name:
//     max:
// }
// Expense
// {
//     id:
//     budgetId:
//     amount:
//     description:
// }
const BudgetsProvider = ({children}) => {
    // TODO: Replace using localStorage with POST and GET data to future API endpoint.
    const [budgets, setBudgets] = useLocalStorage("budgets", [])
    const [expenses, setExpenses] = useLocalStorage("expenses", [])

    function getBudgetExpenses(budgetId: uuidV4) {
        return expenses.filter((expense) => expense.budgetId === budgetId);
    }
    
    function addExpense({description, amount, budgetId}) {
        setExpenses(prevExpense => {
            return [...prevExpense, {id: uuidV4(), description, amount, budgetId}];
        })
    }
    
    function addBudget({name, max}) {
        setBudgets(prevBudgets => {
            if (prevBudgets.find(budget => budget.name === name)) {
                return prevBudgets;
            }
            return [...prevBudgets, {id: uuidV4(), name, max}];
        })
    }

    function deleteBudget({ id }) {
        // TODO: expenses from deleted budget not properly uncategorized
        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget.id !== id);
        })
    }

    function deleteExpense({ id }) {
        setExpenses(prevExpenses => {
            return prevExpenses.filter(expense => expense.id !== id);
        })
    }

    return (
        <BudgetsContext.Provider value={{
            budgets,
            expenses,
            getBudgetExpenses,
            addExpense,
            addBudget,
            deleteBudget,
            deleteExpense
            }}>

            {children}
        </BudgetsContext.Provider>
    );
}

const useBudgets = () => {
    const budgetsHelpers = useContext(BudgetsContext);
    return budgetsHelpers;
};

export {BudgetsContext, useBudgets};
export default BudgetsProvider;