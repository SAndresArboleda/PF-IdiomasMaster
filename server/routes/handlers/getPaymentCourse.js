const Payment = require("../../database/models/Payment");

const getPaymentCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const payment = await Payment.find({ course_payment: id });

    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }

    return res.status(200).json(payment);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = getPaymentCourse;
