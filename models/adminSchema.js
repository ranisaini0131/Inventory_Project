import mongoose from "mongoose";
import bcrypt from "bcrypt";

//creating schema
const adminSchema = new mongoose.Schema({
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
    },
    Role: {
        type: String,
        default: "Admin"
    }
})

adminSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12)
    }
    next();
})

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;