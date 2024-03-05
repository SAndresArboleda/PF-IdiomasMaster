const Payment = require("../.././database/models/Payment");

const putPayment = async (req, res) => {
  try {
    const { status, id } = req.body;

    const payment = await Payment.findById(id);

    if (!payment) {
      return res.status(404).send("Payment not found");
    }

    if (status) {
      payment.status = status;
    }

    await payment.save();

    return res.status(200).send("Payment status has been updated");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = putPayment;