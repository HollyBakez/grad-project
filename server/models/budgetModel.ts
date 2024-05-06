import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const budgetSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true 
    },
    max: {
        type: Number,
        required: true
    }

}, { timestamps: true})

export default mongoose.model('Budget', budgetSchema);