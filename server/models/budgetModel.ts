import mongoose from 'mongoose';

const Schema = mongoose.Schema

const expenseSchema = new Schema({
    amount: { type: Number, required: true},
    description: { type: String, required: true}
});

const budgetSchema = new Schema({
    
    name: {
        type: String,
        required: true 
    },
    max: {
        type: Number,
        required: true
    },
    expenses: [expenseSchema]
}, { timestamps: true})

export default mongoose.model('Budget', budgetSchema);