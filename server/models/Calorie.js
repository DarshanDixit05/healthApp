import mongoose from "mongoose";
import  User  from '../models/User.js';

const calCount = new mongoose.Schema({
    food: { type: String, required: true },
    calories : {type: Number, required: true}
  });
  
  const userCalCountSchema = new mongoose.Schema({
    userEmail: { type: mongoose.Schema.Types.String, ref: 'User', required: true },
    entries: [calCount],
    endDate:{type: String, required:true}
  });
  
// Calorie Count model from schema
const UserCalCountModel = mongoose.model('UserCalCount', userCalCountSchema);

export default UserCalCountModel;