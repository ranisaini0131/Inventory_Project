import mongoose from "mongoose";
import bcrypt from "bcrypt";

//creating schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        Unique: true
    },
    phone: {
        type: String,
        Unique: true

    },
    password: {
        type: String
    }
})

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12)
    }
    next();
})

const User = mongoose.model("User", userSchema);

export default User;