import React from 'react'
import { useEffect, useState } from 'react'
import axios from "axios"



const Donate = ({ onPayment }) => {
  const [amounts, setAmounts] = useState([])
  const [donationId, setDonationId] = useState("")

  const [donations, setAllDonations] = useState([])

  const [name, setName] = useState("")

  console.log(donations)

  useEffect(() => {

    axios.get(`${import.meta.env.VITE_B_URL}/api/amt/getAmounts`)
      .then(response => {

        setAmounts(response?.data?.amt)
        setDonationId(response?.data?.donationId)

      })
      .catch(error => {

        console.error('Error fetching data:', error);
      });

    //get all donations..
    axios.get(`${import.meta.env.VITE_B_URL}/api/donation/getAllDonations`)
      .then(response => {

        setAllDonations(response?.data?.donations)
      })
      .catch(error => {

        console.error('Error fetching data:', error);
      });

  }, [])
  return (
    <div>
      <p style={{ color: "white", textAlign: "center" }}>Please Donate! I AM HUNGRY!</p>


      <div>
        <div>
          <img width={200} height={120} style={{ borderRadius: 5 }} src='/beg.png' alt='beg' />
        </div>
        <div style={{ textAlign: "center" }}>
          {name && <p style={{ color: "white", fontFamily: "arial" }}>hi, {name}</p>}
          <p style={{ color: "white", fontSize: 11, fontFamily: "monospace" }}>Name is must!</p>
          <p style={{ fontFamily: "monospace", textAlign: "center", color: "white", fontStyle: "italic" }}>Your donation Id : {donationId} </p>


          <input placeholder='Your name...' type='text' style={{ outline: "none", padding: 3, borderRadius: 3, border: "none" }} onChange={(e) => setName(e.target.value)} />
        </div>
        <p style={{ fontFamily: "monospace", textAlign: "center", color: "wheat" }}>Select Amount to pay : </p>

        {
          amounts && amounts.map(e => {
            return <>

              <span onClick={() => { name && onPayment(e, donationId, name) }}
                style={{
                  margin: 5, background: "blue", color: "white",
                  padding: 6, borderRadius: 3, cursor: name ? "pointer" : "not-allowed"
                }}>Rs.{e}</span>

            </>
          })
        }

      </div>


      {/* all donations */}
      <div style={{ textAlign: "center" }}>
        <p style={{ color: "white", fontFamily: "monospace" }}>All Donations till now!</p>

        <div style={{ height: 250, background: "white", overflowY: "scroll", padding: 2 }}>

          {donations && donations?.map(e => {
            return (
              <>
                <div style={{ display: "", justifyContent: "", lineHeight:0.1,fontFamily:"monospace",
                  padding: 4, background: "black", color: "white", borderRadius: 4, margin: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p>👷‍♂️ {e?.name}</p>
                    <p>💵 Rs.{e?.amount}</p>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p>Id: {e?.donationId}</p>
                    <p>▦ {e?.createdAt?.slice(0, 10)}</p>
                  </div>







                </div>

              </>)


          })}

        </div>
      </div>




    </div>
  )
}

export default Donate