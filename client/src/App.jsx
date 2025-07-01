"use client"
import { useState, useEffect } from 'react'
import Donate from './pages/Donate'
import axios from "axios"

import './App.css'

function App() {

  const [name, setName] = useState("")



  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script")
      script.src = src
      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }

  const onPayment = async (price, itemName) => {
    try {
      const options = {
        order_id: 1,
        amount: price
      }

      const res = await axios.post("http://localhost:3000/api/createOrder", options)
      const data = res.data
      console.log("data==>", data)

      //interact with rp server
      const paymentObject = new window.Razorpay({
        key: import.meta.VITE_RPKEY,
        order_id: data.order.id,
        ...data.order,

        //after success
        handler: async function (res) {
          console.log("handler res==>", res)

          const options2 = {
            order_id: res.razorpay_order_id,
            payment_id: res.razorpay_payment_id,
            signature: res.razorpay_signature,
          }
          await axios.post("http://localhost:3000/api/verifyPayment", options2).then(res => {
            console.log(res.data)
            if (res.data.success) {
              alert("suc")
            } else {
              alert("fai")
            }
          }).catch(e => console.log(e))
        }


      })
      paymentObject.open()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js")
  }, [])


  return (
    <>
      <div
        style={{
          background: "linear-gradient(to right, #283048, #859398)", width: "100vw", height: "100vh", display: "flex",
          justifyContent: "center", alignItems: ""
        }} >
        <Donate  onPayment={onPayment} />


      </div>
    </>
  )
}

export default App
