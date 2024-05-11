import { useState } from "react";
import { Button, Card, Form, FormLabel, InputGroup, ProgressBar, Stack } from "react-bootstrap";
import { currencyFormatter } from "../../utils/utils";

export default function ExpenseCalc() {
    const [grossIncome, setGrossIncome] = useState('');
    const [grossIncomeFormVal, setGrossIncomeFormVal] = useState('');
    const [essentialExpenses, setEssentialExpenses] = useState<number>(0);
    const [retireContrib, setRetireContrib] = useState<number>(0);
    const [emergencyFunds, setEmergencyFunds] = useState<number>(0);
    const [remainingFunds, setReaminingFunds] = useState<number>(0);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setGrossIncome(grossIncomeFormVal);
        setEssentialExpenses((grossIncomeFormVal * .50));
        setRetireContrib((grossIncomeFormVal *.15));
        setEmergencyFunds((grossIncomeFormVal* .05));
        setReaminingFunds((grossIncomeFormVal*.30));
        setIsSubmitted(true);

    }
    const handleGrossIncomeChange = (e) => {
        setGrossIncomeFormVal(e.target.value);
    }

    const onReset = () => {
        setGrossIncome('');
        setGrossIncomeFormVal('');
        setEssentialExpenses(0);
        setRetireContrib(0);
        setEmergencyFunds(0);
        setReaminingFunds(0);
        setIsSubmitted(false);
    }

    return (
        <>
        <Form>
            <Form.Group className="mb-3" controlId="formGrossIncome">
                <FormLabel>Gross Income</FormLabel>
                <InputGroup className="mb-3">
                    <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control aria-label="Amount (to the nearest dollar)" formMethod="post" type="number" min={0} step="any" placeholder={currencyFormatter.format(100000)} 
                    name="grossIncome" value={grossIncomeFormVal} onChange={handleGrossIncomeChange}/>
                    <InputGroup.Text>.00</InputGroup.Text>
                </InputGroup>
                <Form.Text className="text-muted">
                    Enter your gross income to calculate your recommended expenses
                </Form.Text>
            </Form.Group>
            <Stack direction="horizontal" gap={5} className="mb-4">
                <Button variant="primary" type="button" onClick={handleSubmit}>
                    Calculate
                </Button>
                <div className="p-2 ms-auto"/>
                <Button variant="outline-secondary" type="button" onClick={() => onReset()}>
                        Clear
                </Button>
            </Stack>

        </Form>

        {isSubmitted ? 
        <div className="card-grid">
        <div className="budget-card">
            <Card className="bg-light">
                <Card.Body>
                    <Card.Title 
                        className="d-flex justify-content-between 
                        align-items-baseline fw-normal mb-3"
                    >
                        <div>Essential Expenses</div>
                        <div>{currencyFormatter.format(essentialExpenses)}
                            <>/{currencyFormatter.format(grossIncome)}</></div>
                    </Card.Title>
                    <ProgressBar
                    className="rounded-pill"
                    min={0}
                    now={essentialExpenses}
                    label={`${50}%`} 
                    max={grossIncome}
                    />

                </Card.Body>
            </Card>
        </div>
        <div className="budget-card">
            <Card className="bg-light">
                <Card.Body>
                    <Card.Title 
                        className="d-flex justify-content-between 
                        align-items-baseline fw-normal mb-3"
                    >
                        <div>Retirement Contributions</div>
                        <div>{currencyFormatter.format(retireContrib)}
                            <>/{currencyFormatter.format(grossIncome)}</></div>
                    </Card.Title>
                    <ProgressBar
                    className="rounded-pill"
                    min={0}
                    now={retireContrib}
                    label={`${15}%`} 
                    max={grossIncome}
                    />

                </Card.Body>
            </Card>
        </div>
        <div className="budget-card">
            <Card className="bg-light">
                <Card.Body>
                    <Card.Title 
                        className="d-flex justify-content-between 
                        align-items-baseline fw-normal mb-3"
                    >
                        <div>Emergency Funds</div>
                        <div>{currencyFormatter.format(emergencyFunds)}
                            <>/{currencyFormatter.format(grossIncome)}</></div>
                    </Card.Title>
                    <ProgressBar
                    className="rounded-pill"
                    min={0}
                    now={emergencyFunds}
                    label={`${5}%`} 
                    max={grossIncome}
                    />
                </Card.Body>
            </Card>
        </div>
        <div className="budget-card">
            <Card className="bg-light">
                <Card.Body>
                    <Card.Title 
                        className="d-flex justify-content-between 
                        align-items-baseline fw-normal mb-3"
                    >
                        <div>Discretionary Expenses</div>
                        <div>{currencyFormatter.format(remainingFunds)}
                            <>/{currencyFormatter.format(grossIncome)}</></div>
                    </Card.Title>
                    <ProgressBar
                    className="rounded-pill"
                    min={0}
                    now={remainingFunds}
                    label={`${30}%`} 
                    max={grossIncome}
                    />
                </Card.Body>
            </Card>
        </div>
        </div>
        : null
        }
        </>

    )

}