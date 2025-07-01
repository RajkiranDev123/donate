import dotenv from "dotenv"
dotenv.config({ path: './.env' })
import { dbConnection } from "./config/db.js"

// console.log(process.env.PORT)
import express from "express"
import cors from "cors"
import router from "./routes/paymentRotes.js"
import amountRouter from "./routes/amountRoutes.js"
import donationRouter from "./routes/donationRoutes.js"




dbConnection()
const app=express()
app.use(express.json())
app.use(cors())

app.use("/api",router)
app.use("/api/amt",amountRouter)
app.use("/api/donation",donationRouter)





app.listen(process.env.PORT,()=>{
    console.log(`listening on ${process.env.PORT}`)
})


