import  Calorie  from '../models/Calorie.js';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import express from 'express'

export const storeCalorie = async(req,res) =>{
        console.log(req.body);
        const calorie = await Calorie.create({
            food:req.body.foodItem,
            calories:req.body.calCount
        }).then(() => res.json('Example added!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
}