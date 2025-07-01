import express from "express"
import { getAmounts } from "../controllers/amtController.js"
const router = express.Router()

router.get("/getAmounts", getAmounts)



export default router