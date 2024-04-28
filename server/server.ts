import express from "express";
import 'dotenv/config';
import budgetRoutes from "./routes/budgets";
import mongoose from "mongoose";
import cors from "cors";

// express app
const app = express()

// middleware to log incoming requests
app.use(express.json());

app.use(cors());

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(req.path, req.method);
    next()
});

// routes
app.use('/api/budgets', budgetRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI || '')
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port 4000');
        })
    })
    .catch((error) => {
        console.log(error)
    })


