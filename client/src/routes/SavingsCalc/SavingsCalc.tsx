import { Form, FormLabel, InputGroup, Stack, Button, Card } from "react-bootstrap";
import { currencyFormatter } from "../../utils/utils";
import { useState } from "react";

export default function SavingsCalc() {
    const [savingAmountGoal, setSavingAmountGoal] = useState('');
    const [savingAmountGoalFormVal, setSavingAmountGoalFormVal] = useState('');
    const [savingTarget, setSavingTarget] = useState('');
    const [savingTargetFormVal, setSavingTargetFormVal] = useState('');
    const [savePerMonth, setSavePerMonth] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);

    function calculateMonthDiff (dateToString: Date): number {
        const dateFrom = new Date();
        const dateTo = new Date(dateToString);
        // return the difference in months given a dateFrom and dateTo
        return dateTo.getMonth() - dateFrom.getMonth() + (12 * (dateTo.getFullYear() - dateFrom.getFullYear()));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSavingAmountGoal(savingAmountGoalFormVal);
        setSavingTarget(savingTargetFormVal);
        setSavePerMonth(savingAmountGoalFormVal/calculateMonthDiff(savingTargetFormVal));
        setIsSubmitted(true);

    }

    const onReset = () => {
        setSavingAmountGoalFormVal('');
        setSavingTargetFormVal('');
        setSavingAmountGoal('');
        setSavingTarget('');
        setSavePerMonth(0);
        setIsSubmitted(false);

    }

    const handleSavingAmountGoalChange = (e) => {
        setSavingAmountGoalFormVal(e.target.value);
    }

    const handleSavingTargetChange = (e) => {
        setSavingTargetFormVal(e.target.value);
    }

    return (
        <>
        <Form>
            <Form.Group className="mb-3" controlId="formSavingAmountGoal">
                <FormLabel>Savings Amount Goal</FormLabel>
                <InputGroup className="mb-3">
                    <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control aria-label="Amount (to the nearest dollar)" formMethod="post" type="number" min={0} step="any" placeholder={currencyFormatter.format(100000)} 
                    name="saveAmountGoal" value={savingAmountGoalFormVal} onChange={handleSavingAmountGoalChange}/>
                    <InputGroup.Text>.00</InputGroup.Text>
                </InputGroup>
                <Form.Text className="text-muted">
                    Enter how much money you want to have saved up.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGrossIncome" controlId="validationCustom04">
                <FormLabel>Target Date</FormLabel>
                        <Form.Control formMethod="post" type="date" 
                    name="targetDate" value={savingTargetFormVal} onChange={handleSavingTargetChange} min={new Date().toJSON().slice(0, 10)} required/>
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid future target date.
                        </Form.Control.Feedback>
                <Form.Text className="text-muted">
                    Enter the future target date you want to have the money saved by. Only month and year will be considered.
                </Form.Text>
            </Form.Group>
            <Form.Group>
                <Form.Text>
                        NOTE: The calculated savings rate for the savings goal only takes into account month and year. 
                </Form.Text>
            </Form.Group>
            <Form.Group>
                <Form.Text>
                        Days in a target month and days in the current month will not be taken into consideration.
                </Form.Text>           
            </Form.Group>
            <div className="p-2"/>
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
            <>
                <Card className="bg-light">
                    <Card.Body>
                        <Card.Title 
                            className="d-flex justify-content-between 
                            align-items-baseline fw-normal mb-3"
                        >
                            <div>To save {currencyFormatter.format(savingAmountGoal)} by {savingTarget}</div>
                        </Card.Title>
                        <Card.Text>
                            You will need to save {currencyFormatter.format(savePerMonth)} every month for a total of approx: {calculateMonthDiff(savingTarget)} months
                        </Card.Text>
                    </Card.Body>
                </Card>
            </>
        : null}
        </>

    )
}