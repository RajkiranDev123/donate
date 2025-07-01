import React from 'react'
import { useEffect, useState } from 'react'
import axios from "axios"



const Donate = ({ onPayment }) => {
  const [amounts, setAmounts] = useState([])
  useEffect(() => {

    axios.get("http://localhost:3000/api/amt/getAmounts")
      .then(response => {

        setAmounts(response?.data?.amt)
      })
      .catch(error => {

        console.error('Error fetching data:', error);
      });

  }, [])
  return (
    <div>

      <div>
        <div>
          <img width={300} height={300} style={{ borderRadius: 5 }} src='/beg.png' alt='beg' />
        </div>
        <p>Select Amount : </p>
        {
          amounts && amounts.map(e => {
            return <>

              <span onClick={() => onPayment(e, "colgate")}
                style={{ margin: 5, background: "blue", color: "white", padding: 4, borderRadius: 3, cursor: "pointer" }}>Rs.{e}</span>

            </>
          })
        }

      </div>


      {/* all donations */}




    </div>
  )
}

export default Donate