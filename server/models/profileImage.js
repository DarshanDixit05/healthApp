import mongoose from "mongoose";
import  User  from '../models/User.js';

  const profileImageSchema = new mongoose.Schema({
    userEmail: { type: mongoose.Schema.Types.String, ref: 'User', required: true },
    image: {type:String, required:true}
  });
  
// Profile Image model from schema
const profileImageModel = mongoose.model('profileImage', profileImageSchema);

export default profileImageModel;