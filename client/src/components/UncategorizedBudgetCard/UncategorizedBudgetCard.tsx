import { useEffect, useState } from "react";
import BudgetCard from "../BudgetCard/BudgetCard";
import { UNCATEGORIZED_BUDGET_ID, useBudgets} from "../BudgetsProvider/BudgetsProvider";
import { Spinner } from "react-bootstrap";
import { getData } from "../../utils/RESTHelpers";

const HTTP_PROTOCOL: string = "http";
const serverAddress: string = "localhost";
const serverPort: string = "4000";

const UncategorizedBudgetCard = (props) => {
    const { addExpense } = useBudgets();
    const [budgetExpenses, setBudgetExpenses] = useState();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getBudgetExpenses(UNCATEGORIZED_BUDGET_ID);
      }, [addExpense]);

    const getBudgetExpenses = (UNCATEGORIZED_BUDGET_ID: string) => {
        const url: string = `${HTTP_PROTOCOL}://${serverAddress}:${serverPort}/api/expenses/budgetId/${UNCATEGORIZED_BUDGET_ID}`;
    
        getData(url)
          .then((data) => {
            console.log("Uncategorized Data from get budget expenses: ", data);
            return data.filter((expense) => expense.budgetId === UNCATEGORIZED_BUDGET_ID);
          })
          .then((calculatedBudgetExpense) => {
            setBudgetExpenses(
              calculatedBudgetExpense
                .filter((expense) => expense.budgetId === UNCATEGORIZED_BUDGET_ID)
                .reduce((total, expense) => total + expense.amount, 0)
            );
            setLoading(false);
          });
      };

    // const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
    //     (total, expense) => total + expense.amount, 0
    //   );
    
    if (budgetExpenses == 0) {
        return null;
    }

    return (
        <>
            {isLoading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            ) : 
            (<BudgetCard amount={budgetExpenses} name="Uncategorized" gray {...props}/>)}
        </>

    )
}



export default UncategorizedBudgetCard;