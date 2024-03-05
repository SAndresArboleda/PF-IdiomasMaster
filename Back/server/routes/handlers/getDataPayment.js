const { MercadoPagoConfig, Payment } = require("mercadopago");

const YOUR_ACCESS_TOKEN = process.env.YOUR_ACCESS_TOKEN;

const client = new MercadoPagoConfig({ accessToken: YOUR_ACCESS_TOKEN });

const getDataPayment = async (paymentId) => {
  const payment = await new Payment(client).get({ id: paymentId });
  console.log(payment);
  if (payment.metadata.course_id) {
    return {
      date_created: payment.date_created,
      transaction_amount: payment.transaction_amount,
      status: payment.status,
      payer_id: payment.metadata.user_id,
      course_id: payment.metadata.course_id,
    };
  } else {
    return {
      date_created: payment.date_created,
      transaction_amount: payment.transaction_amount,
      status: payment.status,
      payer_id: payment.metadata.user_id,
      cart_id: payment.metadata.cart_id,
    };
  }
};

module.exports = getDataPayment;
