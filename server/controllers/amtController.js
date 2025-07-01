export const getAmounts = (req, res) => {

    try {

        res.status(200).json({
            success: true, amt: [20, 30]
        })


    } catch (error) {
        return res.status(500).json({
            success: false, message: "Amount fetched failed!"
        })
    }
}