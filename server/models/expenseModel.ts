import mongoose from 'mongoose';

const Schema = mongoose.Schema

const expenseSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    budgetId: {
        type: String,
        required: true
    },
    amount: { type: Number, required: true},
    description: { type: String, required: true}
});

export default mongoose.model('Expense', expenseSchema);
