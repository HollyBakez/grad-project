import express from "express";

const router = express.Router();

// GET all budgets
router.get('/test', (req: express.Request, res: express.Response) => {
    res.json({mssg: "GET budget for id"});
})

// GET a single budget
router.get('/:id', (req: express.Request, res: express.Response) => {

    res.json({mssg: 'GET a single budget'});
})

// POST a single budget
router.post('/', (req: express.Request, res: express.Response) => {
    res.json({mssg: 'POST a single budget'});
})

// DELETE a single budget
router.delete('/:id', (req: express.Request, res: express.Response) => {

    res.json({mssg: 'DELETE a single budget'});
})

// UPDATE a single budget
router.patch('/:id', (req: express.Request, res: express.Response) => {

    res.json({mssg: 'UPDATE a single budget'});
})


export default router;