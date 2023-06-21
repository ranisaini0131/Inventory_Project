import mongoose from "mongoose";
import subCategory from "./subCategory.js";
import bcrypt from "bcrypt";

//creating schema
const categorySchema = new mongoose.Schema({
    category: {
        type: String,
    }
})


const Category = mongoose.model("Category", categorySchema);

export default Category;