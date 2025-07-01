import { createRazorpayInstance } from "../config/razorPay.js"
import crypto from "crypto"

const razorpayInstance = createRazorpayInstance()

export const createOrder = (req, res) => {

    const { order_id, amount } = req.body
    // console.log(order_id,amount)
    const options = {
        amount: amount * 100,
        currency: "INR",
        receipt: "receipt_order_1"
    }
    try {

        razorpayInstance.orders.create(options, (err, order) => {
            if (err) {
                return res.status(500).json({
                    success: false, message: "Payment Failed1!"
                })
            }
            // console.log("order==>",order)
            res.status(200).json({
                success: true, order
            })
        })

    } catch (error) {
        return res.status(500).json({
            success: false, message: "Payment Failed2!"
        })
    }
}


export const verifyPayment = (req, res) => {

    const { dId, payment_id, signature } = req.body

    const secret = process.env.RAZORPAY_KEY_SECRET
    const hmac = crypto.createHmac("sha256", secret)

    hmac.update(dId + "|" + payment_id)

    const generatedSignature = hmac.digest("hex")

    if (generatedSignature == signature) {
        // do db operations etc
        return res.status(200).json({
            success: true,
            message: "Payment Verified!"
        })
    } else {
        return res.status(400).json({
            success: false,
            message: "Payment not Verified!"
        })
    }




    try {

        razorpayInstance.orders.create(options, (err, order) => {
            if (err) {
                return res.status(500).json({
                    success: false, message: "Payment Failed1!"
                })
            }
            res.status(200).json({
                success: true, order
            })
        })

    } catch (error) {
        return res.status(500).json({
            success: false, message: "Payment Failed2!"
        })
    }
}