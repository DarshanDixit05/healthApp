import  UserCalCountModel  from '../models/Calorie.js';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import express from 'express'
import  User  from '../models/User.js';

async function createCalorieEntry(em, food, calories) {
    // Find the user associated with the given `email (em)`
    const user = await User.findOne({ email: em });
  
    // Find the user calorie count document associated with the user's `email (em)`
    let userCalCount = await UserCalCountModel.findOne({ userEmail: em });
  
    // If no user calorie count document exists, create a new one
    if (!userCalCount) {
      userCalCount = new UserCalCountModel({
        userEmail: em,
        entries: []
      });
    }
  
    // Push the new calorie count entry to the `entries` array
    userCalCount.entries.push({
      food: food,
      calories: calories
    });
  
    // Save the updated user calorie count document
    await userCalCount.save();
  }

export const storeCalorie = async(req,res) =>{
        console.log(req.body);

        //Getting all the data from frontend
        const email = req.body.email;
        const food = req.body.foodItem;
        const calCount = req.body.calCount;

        //Finding the user through the email recieved from the frontend
        const user = await User.findOne({ email: email });
        // console.log(user.email);

        //Creating the entry through this function
        await createCalorieEntry(email,food , calCount);

        // const userCalCount = await UserCalCountModel.findOne({ email: email }).populate('userEmail');
        // console.log(userCalCount.entries);
}

export const getCalorieCount = async(req, res) =>{
      const em = req.query.email;
      console.log(em);
      UserCalCountModel.findOne({ userEmail: em }, (err, data)=>{
        if (err) {
          console.log(err);
          res.status(500).send('Error retrieving data from database');
        } else {
          res.json(data);
        }
      });
}

export const setCaloriesGoal = async(req,res) =>{
  console.log(req.body);
  try{
    const calorieGoal = req.body.calorie;
    const email = req.body.email;
    const endDate = req.body.endDate;
    console.log(endDate+"check");
    const currDate = req.body.currDate;
    const user = await User.findOne({email : email});
    const useCalCount = await UserCalCountModel.findOne({email : email});
    user.calorieGoal = calorieGoal;
    useCalCount.endDate = endDate;
    await useCalCount.save();
    await user.save();
    res.send(user);
  }catch (err){
    res.status(500).send();
  }
}

export const getCaloriesGoal = async(req,res) => {
  const email = req.query.email;
  User.findOne({email:email}, (err, data) =>{
    if(err)
    {
      console.log(err);
      res.status(500).send('Error retrieving data from database');
    }else{
      res.json(data)
    }
  });
}