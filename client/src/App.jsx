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

  const onPayment = async (price, donationId, name) => {
    try {
      const options = {

        amount: price
      }

      const res = await axios.post(`${import.meta.env.VITE_B_URL}/api/createOrder`, options)
      const data = res.data


      //interact with rp server
      const paymentObject = new window.Razorpay({
        key: import.meta.env.VITE_RPKEY,
        order_id: data.order.id,
        ...data.order,

        //after success
        handler: async function (res) {


          const options2 = {
            order_id: res?.razorpay_order_id,
            payment_id: res?.razorpay_payment_id,
            signature: res?.razorpay_signature,
            donationId:donationId,
            name:name,
            amount:price
          }
          await axios.post(`${import.meta.env.VITE_B_URL}/api/verifyPayment`, options2).then(res => {
            console.log("res ofter final verification==>", res)
            if (res.data.success) {
              alert("Payment success!")
            } else {
              alert("Payment failed!")
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
        <Donate onPayment={onPayment} />


      </div>
    </>
  )
}

export default App
