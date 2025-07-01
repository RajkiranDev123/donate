import dotenv from "dotenv"
dotenv.config({ path: './.env' })

import razorpay from "razorpay"


console.log(process.env.RAZORPAY_KEY_SECRET)
export const createRazorpayInstance = () => {
    return new razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    })
}