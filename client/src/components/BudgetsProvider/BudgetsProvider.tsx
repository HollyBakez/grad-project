import React, { useContext } from 'react';
import { v4 as uuidV4 } from 'uuid';
import useRestServer  from '../../hooks/useRestServer';
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

    const [budgets, setBudgets] = useRestServer("budgets", [])
    const [expenses, setExpenses] = useRestServer("expenses", [])
    
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

        patchData(expenseUpdateUrl)
        .then(() => {
            getData(expenseUrl)
            .then((expenseData) => {
                setExpenses(expenseData);
            })
        });

        deleteData(budgetDeleteUrl)
        .then(() => {
            getData(budgetUrl)
            .then((budgetData) => {
                setBudgets(budgetData);
            })
        });

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

    }

    return (
        <BudgetsContext.Provider value={{
            budgets,
            expenses,
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