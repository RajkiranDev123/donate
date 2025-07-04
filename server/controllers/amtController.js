export const getAmounts = (req, res) => {

    function generateRandomFourDigitNumber() {
        return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    }
    let randomNumber = generateRandomFourDigitNumber();

    try {
        return res.status(200).json({
            success: true, amt: [20, 30, 100], donationId: "dId" + randomNumber
        })
    } catch (error) {
        return res.status(500).json({
            success: false, message: "Amount fetched failed!"
        })
    }
}