import mongoose from "mongoose";
import Schema from "mongoose";
import bcrypt from "bcrypt";

//creating schema
const billSchema = new mongoose.Schema({

    userId: {
        type: String
        //ref of user
    },
    itemCode: {
        type: Number
    },
    Product: {
        type: String
    },
    Quantity: {
        type: Number
    },
    MRP: {
        type: Number
    },
    Discount: {
        type: Number
    },
    AddDiscount: {
        type: Number
    },
    unitCost: {
        type: Number
    },
    netAmount: {
        type: Number
    }


})

const Bill = mongoose.model("bill", billSchema);

export default Bill; 