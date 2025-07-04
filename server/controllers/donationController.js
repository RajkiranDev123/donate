import { DonationModel } from "../models/donationSchema.js"
export const getAllDonations = async (req, res) => {
    try {
        const dons = await DonationModel.find()
        return res.status(200).json({
            success: true, donations: dons
        })

    } catch (error) {
        return res.status(500).json({
            success: false, message: "All Donations fetched failed!"
        })
    }
}