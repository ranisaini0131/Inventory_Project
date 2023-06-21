import mongoose from "mongoose";
import Schema from "mongoose";
import bcrypt from "bcrypt";

//creating schema
const productSchema = new mongoose.Schema({
    productCode: {
        type: String,
        Unique: true

    },
    productName: {
        type: String
    },
    productType: {
        type: String

    },
    printName: {
        type: String

    },
    category: {
        // type: String.Types.ObjectId, ref: "Category"
        // type: mongoose.Schema.Types.ObjectId, re: "Category"
    },
    subCategory: {
        // type: String.Types.ObjectId, ref: "subCategory"
    },
    SelectBrand: {
        type: String

    },
    subBrand: {
        type: String

    },
    UOM: {
        type: String

    },
    HSN: {
        type: String

    },
    taxIncluded: {
        type: Boolean,
        default: false
    },
    salesTaxIncluded: {
        type: Boolean,
        default: false
    },
    purchasePrice: {
        type: Number
    },
    loadingCost: {
        type: Number
    },
    MRP: {
        type: Number
    },
    Discount: {
        type: Number
    },
    sellingPrice: {
        type: Number
    },
    sellingMargin: {
        type: Number
    },
    retailerDiscount: {
        type: Number
    },
    retailerPrice: {
        type: Number
    },
    retailerMargin: {
        type: Number
    },
    wholesalerPrice: {
        type: Number
    },
    wholesalerMargin: {
        type: Number
    },
    minimumQuality: {
        type: Number
    },
    maximumQuality: {
        type: Number
    },
    openingQty: {
        type: Number
    },
    membershipMargin: {
        type: Number
    },
    MRP: {
        type: Number
    },



})

const Product = mongoose.model("product", productSchema);

export default Product;