import Admin from "../models/adminSchema.js";
import User from "../models/userSchema.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const secreatKey = process.env.secreatKey;

class adminController {
    static userSignup = async (req, res) => {
        try {
            const { email } = req.body
            const user = await User.findOne({
                email
            })
            if (user) {
                res.send({
                    "status": "failed",
                    "msg": "Email already exists"
                })
            } else {
                const newUser = new User(req.body);
                await newUser.save();
            }
            res.send({
                status: "success",
                message: "User signup successful"
            })
        } catch (error) {
            console.log(error);
        }
    }

    static adminSignup = async (req, res) => {
        try {
            // console.log(req.body);
            const newAdmin = new Admin(req.body);
            await newAdmin.save();
            res.send({
                status: "success",
                message: "Admin signup successful"
            })
        } catch (error) {
            console.log(error);
        }
    }
    static adminLogin = async (req, res) => {
        try {
            const { email, password } = req.body;
            const existedAdmin = await Admin.findOne({ email });
            if (!existedAdmin) {
                res.send({
                    status: "failed",
                    msg: "Admin Login unsuccessful"
                })
            } else {
                const isMatched = await bcrypt.compare(password, existedAdmin.password);

                if (isMatched) {
                    const token = jwt.sign({
                        user: existedAdmin
                    },
                        process.env.secreatKey,
                        { expiresIn: "3d" }
                    )

                    res.send({
                        status: "success",
                        message: "Admin Login successful",
                        token: token
                    })
                } else {
                    res.send({
                        status: "failed",
                        message: "Admin Login unsuccessful"
                    })
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    static changePasswordByAdmin = async (req, res) => {
        try {
            console.log(req.body, "71")
            const { _id, new_password } = req.body //req.body means frontend se data aara h
            const salt = await bcrypt.genSalt(12);
            const newHashPassword = await bcrypt.hash(new_password, salt)
            await User.findByIdAndUpdate(_id, { password: newHashPassword }); //gives the object

            res.send({
                "status": "successful",
                "msg": "password change successfully"
            })

        } catch (error) {
            res.json(error);
        }

    }

    //getAllBill
    static getAllBills = async (req, res) => {
        try {
            console.log(req.body);
            const data = await Bill.find()
            res.send(data)
        } catch (error) {
            console.log(error);
        }
    }

    //getAllUser= find() authenticated by Admin
    static getAllUsers = async (req, res) => {
        try {
            console.log(req.body)
            const data = await User.find()
            res.send(data)
        } catch (error) {
            console.log(error)
        }
    }
}

export default adminController