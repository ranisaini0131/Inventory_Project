import mongoose from "mongoose";
import Schema from "mongoose"
import Category from "./category.js";
import bcrypt from "bcrypt";

//creating schema
const subCategorySchema = new mongoose.Schema({
    subCategry: {
        type: String,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId, ref: "Category"
    },
})

const subCategory = mongoose.model("subCategory", subCategorySchema);

export default subCategory;