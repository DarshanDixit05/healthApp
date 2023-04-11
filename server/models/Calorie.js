import mongoose from "mongoose";

const calCount = new mongoose.Schema({
    food: { type: String, required: true },
    calories : {type: Number, required: true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// Calorie Count model from schema
const Calorie = mongoose.model('calCount', calCount);

export default Calorie;