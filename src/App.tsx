import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import BudgetCard from './components/BudgetCard/BudgetCard';
import Container from "react-bootstrap/Container";
import { Button, Stack} from "react-bootstrap";
import "./App.css";

import AddBudgetModal from "./components/AddBudgetModal/AddBudgetModal";
import { useBudgets } from "./components/BudgetsProvider/BudgetsProvider";

export default function App() {
  const { budgets, getBudgetExpenses } = useBudgets();
  const [showBudgetModal, setBudgetModal] = useState(false);

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto" >Budgets</h1>
          <Button variant="primary" onClick={() => setBudgetModal(true)}>
            Add Budget</Button>
          <Button variant="outline-primary">Add Expense</Button>
        </Stack>
        <div className="card-grid">
          {budgets.map(budget => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount, 0
            );
            return (
              <BudgetCard
                key={budget.id} 
                name={budget.name} 
                amount={amount} 
                max={budget.max}>
              </BudgetCard>      
            )
          } 
        
      )}
          
        </div>
      </Container>
      <AddBudgetModal show={showBudgetModal} handleClose={() => setBudgetModal(false)}/>
    </>


  );
}
