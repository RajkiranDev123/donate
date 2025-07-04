import { createRazorpayInstance } from "../config/razorPay.js"
import crypto from "crypto"
import { DonationModel } from "../models/donationSchema.js"


const razorpayInstance = createRazorpayInstance()

// creating order is first step in payment and order contains details like amt and currency!
// it will return order_id &  order_id secures the payment and cant be tampered!
export const createOrder = (req, res) => {

    const { donation_id, amount } = req.body

    //db
    // use order_id or product_id or donation_id to fetch amount from db based on it

    const options = {
        amount: amount * 100,
        currency: "INR",
        receipt: "receipt_order_1"
    }
    try {

        razorpayInstance.orders.create(options, (err, order) => {
            if (err) {
                return res.status(500).json({
                    success: false, message: "Payment Failed! Order creation failed!"
                })
            }

            return res.status(200).json({
                success: true, order
            })
        })

    } catch (error) {
        return res.status(500).json({
            success: false, message: "Payment Failed! or order creation failed!"
        })
    }
}



// it wont hit rp
// only for db purpose
export const verifyPayment = async (req, res) => {

    const { order_id, payment_id, signature, amount, donationId, name } = req.body
    ///////     from rp          ///////////        

    const secret = process.env.RAZORPAY_KEY_SECRET

    // hmac combines (crypographic hash function : sha256) with a (secret key) to create unique message/signature
    const hmac = crypto.createHmac("sha256", secret) // hmac object
    hmac.update(order_id + "|" + payment_id)
    const generatedSignature = hmac.digest("hex") // hex : uses 16 symbols : 0-9 (10 symbols) A-F (6 symbols) A is 10 F is 15
    //digest : is a fixed length numerical representation of data, created by a cryptographic hash function

    //generated signature = order_id + hmac object + payment_id

    if (generatedSignature == signature) {

        const donations = new DonationModel({
            amount, donationId, name
        })

        await donations.save()

        return res.status(200).json({
            success: true,
            message: "Payment Verified!",
            donations
        })
    } else {
        return res.status(500).json({
            success: false,
            message: "Payment not Verified!"
        })
    }

}