import mongoose from 'mongoose';

const Schema = mongoose.Schema

const budgetSchema = new Schema({
    
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