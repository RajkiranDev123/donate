
import { useEffect, useState } from 'react'
import axios from "axios"
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Donate = ({ onPayment, sendFunToChild }) => {
  const [amounts, setAmounts] = useState([])
  const [donationId, setDonationId] = useState("")
  const [randomOtp, setRandomOtp] = useState("")


  const [donations, setAllDonations] = useState([])//db get all donations

  const [name, setName] = useState("")

  const getAllDonations = () => {
    axios.get(`${import.meta.env.VITE_B_URL}/api/donation/getAllDonations`)

      .then(response => {
        setAllDonations(response?.data?.donations)
      })
      .catch(error => {
        console.log(error);
      });
  }

  // get amounts
  const getAmounts = () => {
    axios.get(`${import.meta.env.VITE_B_URL}/api/amt/getAmounts`)

      .then(response => {
        setAmounts(response?.data?.amt)
        setDonationId(response?.data?.donationId)
        setRandomOtp(response?.data?.randomNumber)

      })
      .catch(error => {
        console.log(error);
      });
  }

  sendFunToChild(getAmounts, getAllDonations)

  useEffect(() => {
    getAmounts()
    getAllDonations()
  }, [])

  return (
    <div>
      <p style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>Please Donate ! I AM HUNGRY 🥲!</p>

      {/* img name did input amount */}
      <div style={{ border: "2px solid grey", padding: 11, borderRadius: 4 }}>

        <div style={{ textAlign: "center" }}>
          <img width={200} height={120} style={{ borderRadius: 5 }} src='/beg.png' alt='beg' />
        </div>

        <div style={{ textAlign: "center" }}>
          {name && <p style={{ color: "white", fontFamily: "arial" }}>hi, {name}</p>}
          <p style={{ color: "white", fontSize: 11, fontFamily: "monospace" }}>Name is must!</p>
          <p style={{ fontFamily: "monospace", textAlign: "center", color: "white", fontStyle: "italic" }}>Your donation Id : {donationId} </p>

          {/* copy otp */}
          <p style={{ textAlign: "center" }}>
            <CopyToClipboard text={randomOtp}>
              <span style={{ fontFamily: "monospace", cursor: "pointer", color: "white", display: "flex", alignItems: "center" }}>
                Click here to Copy the OTP Please 🗍</span>
            </CopyToClipboard>

          </p>



          {/* copy ends */}



          <input placeholder='Your name...' type='text' style={{ outline: "none", padding: 3, borderRadius: 3, border: "none" }}
            onChange={(e) => setName(e.target.value)} />
        </div>

        <p style={{ fontFamily: "monospace", textAlign: "center", color: "wheat" }}>Select the Amount to pay : </p>

        {/* all amounts */}
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
        {/*  all amounts ended */}

      </div>
      <br />

      {/* all donations till now*/}
      <div style={{ textAlign: "center", border: "2px solid grey", padding: 5 }}>
        <p style={{ color: "white", fontFamily: "monospace" }}>All Donations 💵💵💵 till now!</p>

        <div style={{ height: 250, background: "white", overflowY: "scroll", padding: 2 }}>

          {donations && donations?.map(e => {
            return (
              <>
                <div style={{
                  display: "", justifyContent: "", lineHeight: 0.1, fontFamily: "monospace",
                  padding: 4, background: "#191970", color: "white", borderRadius: 4, margin: 1
                }}>
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