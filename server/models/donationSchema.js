import mongoose from "mongoose";


const donationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    donationId: {
        type: String,
        required: true,
        trim: true
    },

    amount: {
        type: String,
        required: true,
        trim: true
    },


}, { timestamps: true })
////////////model name
export const DonationModel = new mongoose.model("don", donationSchema)
//////////////////////////////////////// collection name
