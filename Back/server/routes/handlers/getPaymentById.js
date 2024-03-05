const Payment = require("../../database/models/Payment");

const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;

    const payment = await Payment.findById(id);

    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }

    return res.status(200).json(payment);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = getPaymentById;
