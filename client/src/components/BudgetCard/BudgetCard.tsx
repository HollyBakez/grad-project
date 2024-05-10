import { Card, ProgressBar, Stack, Button, Spinner } from "react-bootstrap";
import { currencyFormatter } from "../../utils/utils";
import { getData } from "../../utils/RESTHelpers";
import { v4 as uuidV4 } from "uuid";
import "./BudgetCard.css";
import { useEffect, useState } from "react";
import { useBudgets } from "../BudgetsProvider/BudgetsProvider";

const HTTP_PROTOCOL: string = "http";
const serverAddress: string = "localhost";
const serverPort: string = "4000";

interface BudgetCardProps {
  name: string;
  max: number;
  gray?;
  onAddExpenseClick: () => void;
  onViewExpensesClick: () => void;
  hideButtons?: boolean;
  budgetId: uuidV4;
  amount?: number;
}

function getProgressBarVariant(amount: number, max: number) {
  const ratio = amount / max;
  if (ratio < 0.5) return "primary";
  if (ratio < 0.75) return "warning";
  return "danger";
}

const BudgetCard = (budgetCardProps: BudgetCardProps) => {
  const { addExpense } = useBudgets();
  const [budgetExpenses, setBudgetExpenses] = useState();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getBudgetExpenses(budgetCardProps.budgetId);
  }, [addExpense]);

  const getBudgetExpenses = (budgetId: uuidV4) => {
    const url: string = `${HTTP_PROTOCOL}://${serverAddress}:${serverPort}/api/expenses/budgetId/${budgetId}`;

    getData(url)
      .then((data) => {
        console.log("Data from get budget expenses: ", data);
        return data.filter((expense) => expense.budgetId === budgetId);
      })
      .then((calculatedBudgetExpense) => {
        setBudgetExpenses(
          calculatedBudgetExpense
            .filter((expense) => expense.budgetId === budgetId)
            .reduce((total, expense) => total + expense.amount, 0)
        );
        setLoading(false);
      });
  };

  return (
    <>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <div className="budget-card">
          <Card>
            <Card.Body>
              <Card.Title
                className="d-flex justify-content-between 
                        align-items-baseline fw-normal mb-3"
              >
                <div>{budgetCardProps.name}</div>
                <div>
                  {/* Check for if an amount and hideButtons was passed, if it was then we know this is for the Total card and we use the budgetCardProps.amount */}
                  {typeof budgetCardProps.amount !== "undefined" &&
                  typeof budgetCardProps.hideButtons !== "undefined"
                    ? currencyFormatter.format(budgetCardProps.amount)
                    : currencyFormatter.format(budgetExpenses)}
                  {budgetCardProps.max ? (
                    <>/ {currencyFormatter.format(budgetCardProps.max)}</>
                  ) : null}
                </div>
              </Card.Title>
              {budgetCardProps.max && (
                <ProgressBar
                  className="rounded-pill"
                  //   Check for if an amount and hideButtons was passed, if it was then we know this is for the Total card and we use the budgetCardProps.amount
                  variant={
                    typeof budgetCardProps.amount !== "undefined" &&
                    typeof budgetCardProps.hideButtons !== "undefined"
                      ? getProgressBarVariant(
                          budgetCardProps.amount,
                          budgetCardProps.max
                        )
                      : getProgressBarVariant(
                          budgetExpenses,
                          budgetCardProps.max
                        )
                  }
                  min={0}
                  max={budgetCardProps.max}
                  //   Check for if an amount and hideButtons was passed, if it was then we know this is for the Total card and we use the budgetCardProps.amount
                  // otherwise use the budgetExpenses from the get request
                  now={
                    typeof budgetCardProps.amount !== "undefined" &&
                    typeof budgetCardProps.hideButtons !== "undefined"
                      ? budgetCardProps.amount
                      : budgetExpenses
                  }
                />
              )}
              {/* if hideButtons is true then we don't show the View/Edit Expenses button, this is for the Total Card */}
              {!budgetCardProps.hideButtons ? (
                <Stack direction="horizontal" gap={2} className="mt-4">
                  <Button
                    variant="outline-primary"
                    className="ms-auto"
                    onClick={budgetCardProps.onAddExpenseClick}
                  >
                    Add Expense
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={budgetCardProps.onViewExpensesClick}
                  >
                    View/Edit Expenses
                  </Button>
                </Stack>
              ) : null}
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
};

export default BudgetCard;
