import express from "express"
import {register, login, logout, updateProfile} from '../controllers/userController.js'
import {storeCalorie, getCalorieCount} from '../controllers/foodAnalysisController.js'
import multer from 'multer';

const router = express.Router()

// import controllers
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/updateProfile").patch(updateProfile);

router.route('/sotreCalorie').post(storeCalorie);

router.route('/getCalCount').get(getCalorieCount);

export default router;