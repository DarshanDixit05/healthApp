import express from "express"
import {register, login, logout, updateProfile, updateProfileImage, getProfileImage} from '../controllers/userController.js'
import {storeCalorie, getCalorieCount, setCaloriesGoal, getCaloriesGoal, sendMail} from '../controllers/foodAnalysisController.js'
import multer from 'multer';

const router = express.Router()

// import controllers
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/updateProfile").patch(updateProfile);

router.route('/storeCalorie').post(storeCalorie);
// router.route('/getCalorie').get(mailApi);

router.route('/getCalCount').get(getCalorieCount);
router.route('/setCaloriesGoal').post(setCaloriesGoal);
router.route('/getCaloriesGoal').get(getCaloriesGoal);
router.route('/updateProfileImage').post(updateProfileImage);
router.route('/getProfileImage').get(getProfileImage);
router.route('/sendMail').post(sendMail);

// router.route('/sotreCalorie').get(sendMail);

export default router;