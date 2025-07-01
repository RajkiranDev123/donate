import mongoose from "mongoose";
import validator from "validator"

const usersSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true
    },

    mobile: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 10,
        maxlength: 10
    },


}, { timestamps: true })
////////////model name
export const AmountModel = new mongoose.model("amount", amountSchema)
//////////////////////////////////////// collection name
