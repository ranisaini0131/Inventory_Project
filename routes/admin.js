import express from "express"
import adminController from "../controllers/admin.js"
import middleware from "../middlewares/required.js";

const router = express.Router();

const { admin, auth } = middleware

router.post('/userSignup', auth, admin, adminController.userSignup); //auth checking token present or not 
router.post('/adminSignup', adminController.adminSignup);
router.post('/adminLogin', adminController.adminLogin);
router.post('/changePasswordByAdmin', auth, admin, adminController.changePasswordByAdmin);


router.get('/getAllBills', auth, adminController.getAllBills);


export default router