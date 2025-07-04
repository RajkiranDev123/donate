"use client"
import { useState, useEffect } from 'react'
import Donate from './pages/Donate'
import axios from "axios"

import './App.css'

function App() {

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
      const options = { amount: price }
      const res = await axios.post(`${import.meta.env.VITE_B_URL}/api/createOrder`, options)
      const data = res?.data //after creating order

      //interact with rp server
      const paymentObject = new window.Razorpay({
        // open rp payment sdk and supply this 3
        key: import.meta.env.VITE_RPKEY,
        order_id: data?.order?.id,//got after creating order!
        ...data?.order,

        //after success handler is called!
        handler: async function (res) {
          const options2 = {
            // for generating signature
            order_id: res?.razorpay_order_id,
            payment_id: res?.razorpay_payment_id,
            signature: res?.razorpay_signature,

            // save in db : our purpose
            donationId: donationId,
            name: name,
            amount: price
          }

          //only for db operation after payment success!
          await axios.post(`${import.meta.env.VITE_B_URL}/api/verifyPayment`, options2).then(res => {

            if (res.data.success) {
              alert("Payment success!")
            } else {
              alert("Payment failed!")
            }
          })
            .catch(e => console.log(e))
        }//handler ends


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
