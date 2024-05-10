import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import BudgetCard from './components/BudgetCard/BudgetCard';
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard/UncategorizedBudgetCard";
import Container from "react-bootstrap/Container";
import { Button, Stack, Nav, Navbar, Offcanvas} from "react-bootstrap";
import Logo from './assets/logo.png'
import "./App.css";

import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./components/BudgetsProvider/BudgetsProvider";
import AddBudgetModal from "./components/AddBudgetModal/AddBudgetModal";
import AddExpensesModal from "./components/AddExpensesModal/AddExpensesModal";
import TotalBudgetCard from "./components/TotalBudgetCard/TotalBudgetCard";
import ViewExpensesModal from "./components/ViewExpenses/ViewExpensesModal";
import { getData } from "./utils/RESTHelpers";

const HTTP_PROTOCOL: string = 'http';
const serverAddress: string = 'localhost';
const serverPort: string = '4000';

export default function App() {
  const { budgets, setBudgets, setExpenses } = useBudgets();
  const [showBudgetModal, setBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();

  // initial render when starting session
  useEffect(() => {
    const budgetUrl = `${HTTP_PROTOCOL}://${serverAddress}:${serverPort}/api/budgets/`;
    const expenseUrl = `${HTTP_PROTOCOL}://${serverAddress}:${serverPort}/api/expenses/`;

    const budgetData = getData(budgetUrl)
    .then((budgetsData) => {
      return budgetsData;
    });

    const expenseData = getData(expenseUrl)
    .then((expensesData) => {
      return expensesData;
    });
    const fetchBudgetAndExpense = async () => {
      const tempLoadedBudget = await budgetData;
      const tempLoadedExpense = await expenseData;
      setBudgets(tempLoadedBudget);
      setExpenses(tempLoadedExpense);
    }

    fetchBudgetAndExpense();

  }, [setBudgets, setExpenses]);


  function openAddExpenseModal(budgetId?: number) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }

  return (
    <>
        <Navbar key={false} expand={false} className="bg-body-tertiary mb-3">
          <Navbar.Brand href="#home">
            <img src={Logo} alt="Logo" />
              Budgets
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
          <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${false}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${false}`}>
                  Budget Tools
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="#home">Home</Nav.Link>
                  <Nav.Link href="#action2">Link</Nav.Link>
                </Nav>
              </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Navbar>
        <Container className="my-4" >
              <Stack direction="horizontal" gap={2} className="mb-4">
              <Button variant="primary" onClick={() => setBudgetModal(true)}>
                Add Budget</Button>
              <Button variant="outline-primary" 
                onClick={openAddExpenseModal }>Add Expense</Button>
            </Stack>
            <div className="card-grid">
              {budgets.map(budget => {
                return (
                  <BudgetCard
                    key={budget.id} 
                    budgetId={budget.id}
                    name={budget.name} 
                    max={budget.max}
                    onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                    onViewExpensesClick={() => setViewExpensesModalBudgetId(budget.id)}
                    >
                  </BudgetCard>      
                )
              } 
            
              )}
            <UncategorizedBudgetCard
              onAddExpenseClick={openAddExpenseModal}
              onViewExpensesClick={() =>
                setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)
              }
            />
            <TotalBudgetCard/>  
          </div>

        </Container>
        <AddBudgetModal show={showBudgetModal} handleClose={() => setBudgetModal(false)}/>
        <AddExpensesModal 
          show={showAddExpenseModal}
          defaultBudgetId={addExpenseModalBudgetId} 
          handleClose={() => setShowAddExpenseModal(false)}/>
        <ViewExpensesModal
        budgetId={viewExpensesModalBudgetId}
        handleClose={() => setViewExpensesModalBudgetId()}
        />

    </>


  );
}
