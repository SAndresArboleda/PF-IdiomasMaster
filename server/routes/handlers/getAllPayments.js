const Payment = require("../../database/models/Payment")

const getAllPayments= async (req, res) => {

    try{

        const allPayment = await Payment.find({})

        return res.status(200).json(allPayment);


    }catch(error){
        return res.status(500).send(error.message)
    }
}

module.exports = getAllPayments;