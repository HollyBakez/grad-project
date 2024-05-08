import React, { useContext, useState } from 'react';
import BudgetCard from '../BudgetCard/BudgetCard';
import { v4 as uuidV4 } from 'uuid';
import useLocalStorage  from '../../hooks/useLocalStorage';
import { getData } from '../../utils/RESTHelpers';

const HTTP_PROTOCOL: string = 'http';
const serverAddress: string = 'localhost';
const serverPort: string = '4000';

const BudgetsContext = React.createContext(null);

// Data structure (Schema) for 
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
        const url = `${HTTP_PROTOCOL}://${serverAddress}:${serverPort}/api/expenses/?budgetId=${budgetId}`;
        let budgetExpenses: Array<never> = [];
        getData(url)
        .then((data) => {
            console.log("Data from get budget expenses: ",data);
            budgetExpenses = data;
        });
        if (budgetExpenses.length === 0 ) {
            return [];
        }

        return budgetExpenses.filter((expense) => expense.budgetId === budgetId);
        //return expenses.filter((expense) => expense.budgetId === budgetId);
    }
    
    function addExpense({description, amount, budgetId}) {
        setExpenses(prevExpense => {
            return [...prevExpense, {id: uuidV4(), description, amount, budgetId}];
        })
    }
    
    function addBudget({name, max}: {name: string, max: number}) {
        setBudgets(prevBudgets => {
            if (prevBudgets.find(budget => budget.name === name)) {
                return prevBudgets;
            }
            return [...prevBudgets, {id: uuidV4(), name, max}];
        })
    }

    function deleteBudget({ id }) {
        setExpenses(prevExpenses => {
          return prevExpenses.map(expense => {
            if (expense.budgetId !== id) return expense
            return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID }
          })
        })
    
        setBudgets(prevBudgets => {
          return prevBudgets.filter(budget => budget.id !== id)
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
const UNCATEGORIZED_BUDGET_ID = "Uncategorized";
export {BudgetsContext, useBudgets, UNCATEGORIZED_BUDGET_ID};
export default BudgetsProvider;