import  UserCalCountModel  from '../models/Calorie.js';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import express from 'express'
import  User  from '../models/User.js';
import nodemailer from 'nodemailer';

async function createCalorieEntry(em, food, calories) {
    // Find the user associated with the given `email (em)`
    const user = await User.findOne({ email: em });
    console.log(calories+"ajshdfjh");
    // Find the user calorie count document associated with the user's `email (em)`
    let userCalCount = await UserCalCountModel.findOne({ userEmail: em });
  
    // If no user calorie count document exists, create a new one
    if (!userCalCount) {
      userCalCount = new UserCalCountModel({
        userEmail: em,
        entries: [],
        endDate:""
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
    const currDate = req.body.currDate;
    const user = await User.findOne({email : email});
    const useCalCount = await UserCalCountModel.findOne({email : email});
    user.calorieGoal = calorieGoal;
    useCalCount.endDate = endDate;
    useCalCount.entries = [];
    await useCalCount.save();
    await user.save();
    res.send(user);
  }catch (err){
    res.status(500).send();
  }
}

export const sendMail = async(req, res) => {
  try {
    // const { recipient  = req.query;
    console.log(req.query.email);
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'maria.hand@ethereal.email',
          pass: 'Yr6RTfX3jWepeVUD4V'
      }
  });

// Button click handler to send an email
function sendEmailOnClick() {
  // Email content
  const mailOptions = {
    from: 'darshandixit0@gmail.com',
    to: req.query.email, // Replace with the recipient's email
    subject: 'Calorie achievement',
    text: `Hey ${req.query.email}, you have achieved your calorie goal`
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });

}
sendEmailOnClick();
  } catch (error) {
    console.log(error);
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