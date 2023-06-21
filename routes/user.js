import express from "express";
import userController from "../controllers/user.js";
import middleware from "../middlewares/required.js";

const router = express.Router();

const { auth } = middleware

router.post('/userLogin', userController.userLogin);
router.post('/addProduct', auth, userController.addProduct);
router.post('/changePassword', auth, userController.changePassword);
router.post('/sendEmailApi', auth, userController.sendEmailApi);
router.post('/addCategory', auth, userController.addCategory);
router.post('/addSubCategory', auth, userController.addSubCategory);
router.post('/addBill', auth, userController.addBill);


router.get('/getProduct', auth, userController.getProduct);
router.get('/getCategory', auth, userController.getCategory);
router.get('/getSubCategory', auth, userController.getSubCategory);
router.get('/getBill', auth, userController.getBill);


export default router