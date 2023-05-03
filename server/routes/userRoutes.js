import express from "express"
import {register, login, logout, updateProfile, updateProfileImage, getProfileImage} from '../controllers/userController.js'
import {storeCalorie, getCalorieCount, setCaloriesGoal, getCaloriesGoal} from '../controllers/foodAnalysisController.js'
import multer from 'multer';

const router = express.Router()

// import controllers
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/updateProfile").patch(updateProfile);

router.route('/sotreCalorie').post(storeCalorie);

router.route('/getCalCount').get(getCalorieCount);
router.route('/setCaloriesGoal').post(setCaloriesGoal);
router.route('/getCaloriesGoal').get(getCaloriesGoal);
router.route('/updateProfileImage').post(updateProfileImage);
router.route('/getProfileImage').get(getProfileImage);

export default router;