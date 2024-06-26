import { Button, Form, Modal } from "react-bootstrap";
import { useRef } from "react";
import { useBudgets } from "../BudgetsProvider/BudgetsProvider";

const AddBudgetModal = ({ show, handleClose }) => {
    const budgetNameRef = useRef(); 
    const maxBudgetRef = useRef();
    const {addBudget} = useBudgets();

    function handleSubmit(e) {
        e.preventDefault();
        addBudget(
            {
                name: budgetNameRef.current.value,
                max: parseFloat(maxBudgetRef.current.value)
            }
        );
        handleClose();
        
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>New Budget</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control ref={budgetNameRef} type="text" required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="max">
                        <Form.Label>Maximum Spending</Form.Label>
                        <Form.Control ref={maxBudgetRef} type="number" required min={0} step={0.01} />
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button variant="primary" type="submit">
                            Add
                        </Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    )

}

export default AddBudgetModal;