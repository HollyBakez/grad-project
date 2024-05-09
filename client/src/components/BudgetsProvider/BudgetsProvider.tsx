import React, { useContext } from 'react';
import BudgetCard from '../BudgetCard/BudgetCard';
import { v4 as uuidV4 } from 'uuid';
import useLocalStorage  from '../../hooks/useLocalStorage';
import { deleteData, getData, patchData, postData } from '../../utils/RESTHelpers';

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

    // TODO: Remove this as this is no longer used, the logic will need to be moved separately to each component thqat used to use this
    // SEE BudgetCard getBudgetExpenses logic for example
    function getBudgetExpenses(budgetId: uuidV4) {
        const url = `${HTTP_PROTOCOL}://${serverAddress}:${serverPort}/api/expenses/?budgetId=${budgetId}`;
        let budgetExpenses =[];
        
        getData(url)
        .then((data) => {
            console.log("Data from get budget expenses: ",data);
            budgetExpenses = data;
        });
        
        return budgetExpenses.filter((expense) => expense.budgetId === budgetId);
    }
    
    function addExpense({description, amount, budgetId}) {
        const url = `${HTTP_PROTOCOL}://${serverAddress}:${serverPort}/api/expenses/`;

        const data = {
            id: uuidV4(),
            budgetId: budgetId,
            amount: amount,
            description: description
        }

        postData(url, data)
        .then(() => {
           getData(url)
           .then((expenseData) => {
            setExpenses(expenseData);
           })
        }
        );
    }
    
    function addBudget({name, max}: {name: string, max: number}) {
        const url = `${HTTP_PROTOCOL}://${serverAddress}:${serverPort}/api/budgets/`;
        const data = {
            id: uuidV4(),
            name: name,
            max: max
        }
        postData(url, data)
        .then(() => {
           getData(url)
           .then((budgetData) => {
            setBudgets(budgetData);
           })
        }
        );
    }

    function deleteBudget({ id }) {
        const budgetId = id;
        const expenseUrl = `${HTTP_PROTOCOL}://${serverAddress}:${serverPort}/api/expenses/`;
        const budgetUrl = `${HTTP_PROTOCOL}://${serverAddress}:${serverPort}/api/budgets/`;
        const expenseUpdateUrl = `${HTTP_PROTOCOL}://${serverAddress}:${serverPort}/api/expenses/${budgetId}/uncategorized-expense`;
        const budgetDeleteUrl = `${HTTP_PROTOCOL}://${serverAddress}:${serverPort}/api/budgets/${id}`;

        // TODO: replace with a deleteData REST call with the expenseUrl to 
        // set the category of all expenses tied to the given id to "Uncategorized" since we are deleting the parent Budget

        patchData(expenseUpdateUrl)
        .then(() => {
            getData(expenseUrl)
            .then((expenseData) => {
                setExpenses(expenseData);
            })
        });
        // setExpenses(prevExpenses => {
        //   return prevExpenses.map(expense => {
        //     if (expense.budgetId !== id) return expense
        //     return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID }
        //   })
        // })
    
        // TODO: replace with a deleteData REST call with the budgetUrl passing in the id of the budget to delete
        // Remove comment when confirmed working

        deleteData(budgetDeleteUrl)
        .then(() => {
            getData(budgetUrl)
            .then((budgetData) => {
                setBudgets(budgetData);
            })
        });
        // setBudgets(prevBudgets => {
        //   return prevBudgets.filter(budget => budget.id !== id)
        // })

      }

    function deleteExpense({ id }) {
        const expenseDeleteUrl = `${HTTP_PROTOCOL}://${serverAddress}:${serverPort}/api/expenses/${id}`;
        const expenseUrl = `${HTTP_PROTOCOL}://${serverAddress}:${serverPort}/api/expenses/`;
        deleteData(expenseDeleteUrl)
        .then(() => {
            getData(expenseUrl)
            .then((expenseData) => {
                setExpenses(expenseData);
            })
        });
        // setExpenses(prevExpenses => {
        //     return prevExpenses.filter(expense => expense.id !== id);
        // })
    }

    return (
        <BudgetsContext.Provider value={{
            budgets,
            expenses,
            getBudgetExpenses,
            addExpense,
            addBudget,
            deleteBudget,
            deleteExpense,
            setBudgets, 
            setExpenses
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