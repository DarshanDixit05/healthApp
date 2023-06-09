import  User  from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import express from 'express'
import multer from 'multer';
import ProfileImage from "../models/profileImage.js"
import  UserCalCountModel  from '../models/Calorie.js';
import nodemailer from "nodemailer";

const router = express.Router();

export const register = async (req,res)=>{
  try {
    const { fullName, userName, email, password } = req.body;
    const user = await User.create({ fullName:fullName, userName:userName, email:email, password:password });
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to register user' });
  }
}

export const login = async (req,res)=>{
  try{
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    // user not found
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // pass invalid
    if (password != user.password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const accessToken = user.generateAccessToken();

    // Send success response with access token
    res.status(200).json({ message: 'Logged in successfully', accessToken });

  }catch(err){
    console.log(err);
    res.status(500).json({ message: 'Failed to login' });
  }
}

export const logout = async (req, res) => {
  // const token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header
  
  try {
    console.log(req.headers.authorization);
    // Verify token
    // await jwt.verify(token, process.env.JWT_SECRET);

    // // Clear token from user's token array
    // req.user.tokens = req.user.tokens.filter((t) => t.token !== token);

    // // Save user's updated token array to database
    // await req.user.save();

    // Send success response
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    // Handle error
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateProfileImage = async(req,res) =>{
  const email = req.body.email;
  try {
    let profileImage = await ProfileImage.findOne({email});
    if(!profileImage)
    {
      profileImage = new ProfileImage({
        userEmail: email,
        image:""
      });
    }
    console.log();
    profileImage.image = req.body.newImage.myFile;

    await profileImage.save();
    res.status(200).json({message : 'Stored Successfully'});
    console.log("image stored!");
  } catch (error) {
    console.log(error);
  }
}

export const getProfileImage = async(req, res) =>{
  const email = req.params.email;
  try {
    let profileImage = await ProfileImage.findOne({email}).then(data=>{
      res.json(data);
    }).catch(error => {
      res.status(408).json({ error })
  });
  } catch (error) {
      console.log(error);
  }
}

export const updateProfile = async (req, res) =>{
  // Extract the fields to be updated from the request 
  const updates = Object.keys(req.body);
  // console.log(updates);
  console.log(req.body.userName);
  const allowedUpdates = ['userName', 'email', 'password', 'dupPassword'];
  
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }
  try {
    const {userName, email, password, dupPassword} = req.body;
    const user = await User.findOne({ email });

    // Update user fields with request data
    user.userName = req.body.userName || user.userName;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    
    if(user.password != req.body.dupPassword){
      alert("Re entered password and password don't match.");
      return res.send(400).send({error : 'Invalid credentials!'})
    }

    await user.save();
    
    // await User.save({ userName:userName, email:email, password:password })
    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
};

export const mailApi = async(req, res) =>{
  console.log(req);
  const email = req.query.email;
  console.log("Hello Set mail");
  try {
    const user = await User.findOne({email: email});
    const calorieGoal = user.calorieGoal;
    const calorieModel = await UserCalCountModel.findOne({email: email});
    let totalCalorie=0;
    for(let i=0; i<calorieModel.entries.length; i++)
    {
      totalCalorie+=(calorieModel.entries[i].calories);
    }

    console.log(user.calorieGoal);
    if(totalCalorie>=calorieGoal)
    {
      const subject = 'Congratulations on reaching your calorie goal!';
      const body = `You have reached your daily calorie goal of ${calorieGoal} calories.`;
      sendEmail(email, subject, body);
      console.log(`Email sent to ${email}`);
    }
  } catch (error) {
    console.log(error);
  }
}

function sendEmail(recipient, subject, body) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'bernardo.reilly@ethereal.email',
      pass: 'VMvkU7qzUxEEnP5tuX'
    }
  });

  let mailOptions = {
    from: 'bernardo.reilly@ethereal.email', 
    to: recipient, 
    subject: subject, 
    text: body, 
    html: `<p>${body}</p>` 
  };

  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}