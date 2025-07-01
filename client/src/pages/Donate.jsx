import React from 'react'
import { useEffect, useState } from 'react'
import axios from "axios"



const Donate = ({ onPayment }) => {
  const [amounts, setAmounts] = useState([])
  const [donationId, setDonationId] = useState("")

  const [donations, getAllDonations] = useState([])

  const [name, setName] = useState("")



  useEffect(() => {

    axios.get("http://localhost:3000/api/amt/getAmounts")
      .then(response => {

        setAmounts(response?.data?.amt)
        setDonationId(response?.data?.donationId)

      })
      .catch(error => {

        console.error('Error fetching data:', error);
      });

    //get all donations..
    axios.get("http://localhost:3000/api/donation/getAllDonations")
      .then(response => {

        // setAmounts(response?.data?.amt)
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
          <img width={200} height={200} style={{ borderRadius: 5 }} src='/beg.png' alt='beg' />
        </div>
        <div style={{ textAlign: "center" }}>
         {name&& <p style={{ color: "white", fontFamily: "arial" }}>hi, {name}</p>}
          <p style={{ color: "white", fontSize: 11, fontFamily: "monospace" }}>Name is must!</p>

          <input placeholder='Your name...' type='text' style={{ outline: "none", padding: 3, borderRadius: 3 }} onChange={(e) => setName(e.target.value)} />
        </div>
        <p style={{ fontFamily: "monospace", textAlign: "center", color: "wheat" }}>Select Amount to pay : </p>
        <p style={{ fontFamily: "monospace", textAlign: "center", color: "white",fontStyle:"italic" }}>Your donation Id : {donationId} </p>

        {
          amounts && amounts.map(e => {
            return <>

              <span onClick={() => { name && onPayment(e, "colgate") }}
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

        <div style={{ height: 200, background: "white", overflowY: "scroll" }}>

          <p></p>

        </div>
      </div>




    </div>
  )
}

export default Donate