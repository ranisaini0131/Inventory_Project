import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

import User from "../models/userSchema.js";
import Product from "../models/product.js"
import Category from "../models/category.js";
import subCategory from "../models/subCategory.js";
import Bill from "../models/bill.js";
const secreatKey = process.env.secreatKey;

class userController {


    static userLogin = async (req, res) => {
        console.log(req.body)
        try {
            const { email, password } = req.body;
            const existedUser = await User.findOne({ email });
            if (!existedUser) {
                console.log("your email is not registered");
            } else {
                const isMatched = await bcrypt.compare(password, existedUser.password);
                // console.log(isMatched, "26");

                if (isMatched) {
                    const token = jwt.sign({
                        user: existedUser
                    },
                        process.env.secreatKey,
                        { expiresIn: "3d" }
                    )

                    res.send({
                        status: "success",
                        message: "User Login successful",
                        token: token
                    })
                } else {
                    res.send({
                        status: "failed",
                        message: "User Login unsuccessful"
                    })
                }

            }
        } catch (error) {
            console.log(error);
        }
    }

    static addProduct = async (req, res) => {
        try {
            const newProduct = new Product(req.body);
            await newProduct.save()
            res.send({
                status: "success",
                msg: "products added successfully"
            })
        } catch (error) {
            console.log(error);
        }

    }
    static getProduct = async (req, res) => {
        try {
            console.log(req.user);
            const data = await Product.findOne({ user: req.user._id.Product })
            res.send(data)
        } catch (error) {
            console.log(error);
        }
    }

    static addCategory = async (req, res) => {
        try {
            const newCategory = new Category(req.body)
            await newCategory.save()
            res.send({
                status: "success",
                msg: "category added successfully"
            })
        } catch (error) {
            console.log(error)
        }

    }

    static addSubCategory = async (req, res) => {
        try {
            // const { subCategory, categoryId } = req.body //gives error subCategory is not a constructore
            const newSubCategory = new subCategory(req.body)
            await newSubCategory.save()

            res.send({
                status: "success",
                msg: "subCategory added successfully"
            })
        } catch (error) {
            console.log(error)
        }
    }

    static getCategory = async (req, res) => {
        try {
            console.log(req.body);
            const data = await Category.find()
            res.send(data)
        } catch (error) {
            console.log(error);
        }
    }

    static getSubCategory = async (req, res) => {
        try {
            console.log(req.body);
            const data = await subCategory.find().populate('categoryId')
            res.send(data)
        } catch (error) {
            console.log(error);
        }
    }
    static changePassword = async (req, res) => {
        try {
            const { password, _id } = req.user;
            const { old_password, new_password } = req.body;
            // console.log(req.user, "81")
            const isMatched = await bcrypt.compare(old_password, password);

            if (isMatched) {
                const salt = await bcrypt.genSalt(12);
                const newHashPassword = await bcrypt.hash(new_password, salt);
                await User.findByIdAndUpdate(_id, { password: newHashPassword })
            }
            res.send({
                "status": "successful",
                msg: "password change successfully"
            })

        } catch (error) {
            console.log(error);
        }
    }


    static sendEmailApi = async (req, res) => {

        try {
            let transporter = nodemailer.createTransport({
                // host: localhost,
                // port: 587,
                service: "gmail",
                // secure: false,
                // requireTLS: true,
                auth: {
                    user: "ranisaini414@gmail.com",
                    pass: "TmtCement@00678",
                },
            });

            let mailOptions = {
                from: "ranisaini414@gmail.com",
                to: "sainirani1797@gmail.com",
                subject: "testing Purpose",
                text: "Hello Rani here!!!"
            }

            transporter.sendMail(mailOptions, function (error) {
                if (error) {
                    console.log(error)
                } else {
                    console.log("email sent successfully");
                }
            });

            res.send({
                status: "success",
                msg: "Nodemailer sent mail successfully "
            })
        } catch (error) {
            console.log(error)
        }

    }
    //addBill

    static addBill = async (req, res) => {
        try {
            let data = { ...req.body, userId: req.user._id }
            const newBill = new Bill(data)
            await newBill.save()
            res.send({
                status: "success",
                msg: "Bill added successfully"
            })
        } catch (error) {
            console.log(error)
        }
    }

    //getBill

    static getBill = async (req, res) => {
        try {
            const data = await Bill.find({ userId: req.user._id })
            res.send(data)
        } catch (error) {
            console.log(error);
        }
    }
}


export default userController