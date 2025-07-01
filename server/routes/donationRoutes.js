import express from "express"
import { getAllDonations } from "../controllers/donationController.js"
const router = express.Router()

router.get("/getAllDonations", getAllDonations)



export default router