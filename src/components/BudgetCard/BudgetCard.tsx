import { Card, ProgressBar, Stack, Button } from "react-bootstrap";
import { currencyFormatter } from "../../utils/utils";
import './BudgetCard.css';

const BudgetCard = ({ name, amount, max}) => {
    return (
    <div className= "budget-card">
        <Card>
            <Card.Body>
                <Card.Title className="d-flex justify-content-between 
                align-items-baseline fw-normal mb-3">
                    <div>{name}</div>
                    <div>{currencyFormatter.format(amount)} / {currencyFormatter.format(max)}</div>
                </Card.Title>
                <ProgressBar 
                    className="rounded-pill" 
                    variant={getProgressBarVariant(amount, max)}
                    min={0}
                    max={max}
                    now={amount}
                />
                <Stack direction="horizontal" gap="2" className="mt-4">
                    <Button variant="outline-primary" className="ms-auto">
                        Add Expense
                    </Button>
                    <Button variant="outline-secondary">
                        View Expense
                    </Button>
                </Stack>
            </Card.Body>
        </Card>
    </div>
    );
}

function getProgressBarVariant(amount, max) {
    const ratio = amount/max;
    if (ratio < .5) return "primary";
    if (ratio < .75) return "warning";
    return "danger"
}

export default BudgetCard;