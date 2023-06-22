import Admin from "../models/adminSchema.js";
import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";



class middleware {
    static auth = async (req, res, next) => {
        console.log(req.headers, "9 line")
        const { authorization } = req.headers;
        let token;
        if (authorization && authorization.startsWith("Bearer")) {
            try {
                token = authorization?.split(" ")[1]
                console.log(token)

                //verify token
                const { user } = jwt.verify(token, process.env.secreatKey)
                //get User from token
                req.user = await user
                next()
            } catch (error) {
                console.log(error)
                res.send({
                    status: "failed",
                    msg: "Unauthorized user"
                })
            }
        }
        // if (!token) {
        //     res.send({
        //         status: "failed",
        //         msg: "no token"
        //     })
        // }
    }
    static admin = async (req, res, next) => {
        if (req.user.Role !== "Admin") {
            res.send({
                status: "failed",
                msg: "admin authentication failed",
            })
        }
        next();
    }
}
export default middleware;