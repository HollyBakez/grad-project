import { Card, ProgressBar, Stack, Button } from "react-bootstrap";
import { currencyFormatter } from "../../utils/utils";
import './BudgetCard.css';

interface BudgetCardProps {
    name: string,
    amount: number,
    max: number,
    gray?,
    onAddExpenseClick: () => void,
    onViewExpensesClick: () => void,
    hideButtons?: boolean,
}

function getProgressBarVariant(amount: number, max: number) {
    const ratio = amount/max;
    if (ratio < .5) return "primary";
    if (ratio < .75) return "warning";
    return "danger"
}

const BudgetCard = (budgetCardProps: BudgetCardProps) => {
    return (
    <div className= "budget-card">
        <Card>
            <Card.Body>
                <Card.Title className="d-flex justify-content-between 
                align-items-baseline fw-normal mb-3">
                    <div>{budgetCardProps.name}</div>
                    <div>{currencyFormatter.format(budgetCardProps.amount)} 
                    { budgetCardProps.max ?
                    <>
                        / {currencyFormatter.format(budgetCardProps.max)}
                    </>
                    : null}
                    </div>
                </Card.Title>
                { budgetCardProps.max && <ProgressBar 
                    className="rounded-pill" 
                    variant={getProgressBarVariant(budgetCardProps.amount, budgetCardProps.max)}
                    min={0}
                    max={budgetCardProps.max}
                    now={budgetCardProps.amount}
                />}
                { !budgetCardProps.hideButtons ?
                <Stack direction="horizontal" gap={2} className="mt-4">
                    <Button variant="outline-primary" className="ms-auto" onClick={budgetCardProps.onAddExpenseClick}>
                        Add Expense
                    </Button>
                    <Button variant="outline-secondary" onClick={budgetCardProps.onViewExpensesClick}>
                        View/Edit Expenses
                    </Button>
                </Stack>: null}
            </Card.Body>
        </Card>
    </div>
    );
}




export default BudgetCard;