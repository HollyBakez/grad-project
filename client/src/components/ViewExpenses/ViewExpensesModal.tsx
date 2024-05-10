import { Button, Modal, Spinner, Stack } from "react-bootstrap";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../BudgetsProvider/BudgetsProvider";
import { currencyFormatter } from "../../utils/utils";
import { getData } from "../../utils/RESTHelpers";
import { v4 as uuidV4 } from "uuid";
import { useEffect, useState } from "react";


const HTTP_PROTOCOL: string = "http";
const serverAddress: string = "localhost";
const serverPort: string = "4000";

interface ViewExpensesModalProps {
    budgetId: uuidV4,
    handleClose,
}

const ViewExpensesModal = (viewExpensesModalProps: ViewExpensesModalProps) => {
  // TODO: Need to replace getBudgetExpenses here with its own function 
    const { budgets, deleteBudget, deleteExpense } = useBudgets();
    const [isLoading, setLoading] = useState(true);
    const [budgetExpenses, setBudgetExpenses] = useState();

    useEffect(() => {
      getBudgetExpenses(viewExpensesModalProps.budgetId);
    }, [viewExpensesModalProps.budgetId, deleteBudget, deleteExpense]);
  
    const getBudgetExpenses = (budgetId: uuidV4) => {
      const url: string = `${HTTP_PROTOCOL}://${serverAddress}:${serverPort}/api/expenses/budgetId/${budgetId}`;
  
      getData(url)
        .then((data) => {
          console.log("ViewExpensesModal: Data from get budget expenses: ", data);
          setBudgetExpenses( data.filter((expense) => expense.budgetId === budgetId));
          setLoading(false);
        });
    };
    
    const budget =
      UNCATEGORIZED_BUDGET_ID === viewExpensesModalProps.budgetId
        ? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID }
        : budgets.find(b => b.id === viewExpensesModalProps.budgetId)

    return (
      <>


        
          <Modal show={viewExpensesModalProps.budgetId != null} onHide={viewExpensesModalProps.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <Stack direction="horizontal" gap={2}>
                <div>Expenses - {budget?.name}</div>
                {viewExpensesModalProps.budgetId !== UNCATEGORIZED_BUDGET_ID && (
                  <Button
                    onClick={() => {
                      deleteBudget(budget)
                      handleClose()
                    }}
                    variant="outline-danger"
                  >
                    Delete
                  </Button>
                )}
              </Stack>
            </Modal.Title>
          </Modal.Header>
          {isLoading ? 
            (<Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
            </Spinner>)
            :
            (<Modal.Body>
              <Stack direction="vertical" gap={3}>
                {budgetExpenses ? budgetExpenses.map(expense => (
                  <Stack direction="horizontal" gap={2} key={expense.id}>
                    <div className="me-auto fs-4">{expense.description}</div>
                    <div className="fs-5">
                      {currencyFormatter.format(expense.amount)}
                    </div>
                    <Button
                      onClick={() => deleteExpense(expense)}
                      size="sm"
                      variant="outline-danger"
                    >
                      &times;
                    </Button>
                  </Stack>
                )): null}
              </Stack>
            </Modal.Body>
          )
          }
          </Modal>

    </>

    )

}

export default ViewExpensesModal;