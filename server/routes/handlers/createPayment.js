const Payment = require("../.././database/models/Payment");
const User = require("../.././database/models/User");
const Cart = require("../.././database/models/Cart");
const Course = require("../.././database/models/Course");
const transporter = require("../../nodemailer");
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const getDataPayment = require("./getDataPayment");

const createPayment = async (req, res) => {
  try {
    const { data } = req.body;

    const payment = await getDataPayment(data);

    // console.log(payment);

    const user_id = await User.findOne({ _id: payment.payer_id });
    const newPayment = new Payment({
      Amount: payment.transaction_amount,
      date: payment.date_created,
      status: payment.status,
      student_payment: user_id,
      course_payment: payment.course_id || payment.cart_id,
    });

    const student_payment = user_id;

    if (newPayment) {
      const response = await newPayment.save();

      const coursePaymentId = response.course_payment;

      let idCourse = coursePaymentId.toString();

      const cart = await Cart.findById(idCourse);

      if (!cart) {
        const course = await Course.findById(idCourse);
        if (!course) {
          return res.status(404).send("Course doesn't exist");
        }

        if (course.students.includes(student_payment)) {
          return res.status(400).send("User already is in the Course");
        }

        course.students.push(student_payment);
        await course.save();
      } else {
        for (const courseId of cart.courses) {
          const course = await Course.findById(courseId);
          if (!course) {
            return res.status(404).send("Course doesn't exist");
          }

          if (course.students.includes(student_payment)) {
            return res.status(400).send("User already is in the Course");
          }

          course.students.push(student_payment);
          await course.save();
        }

        cart.status = "shopped";
        await cart.save();
      }

      const idString = response._id.toString();

      const contenidoHTML = fs.readFileSync(
        path.join(__dirname, "../mail/purchaseTemplate.html"),
        "utf-8"
      );

      const responseMail = await transporter.sendMail({
        from: {
          name: "Idiomas Master Admin",
          address: process.env.MAIL_USER,
        },
        to: user_id.email,
        subject: `Compra exitosa, Pago: ${idString}`,
        html: contenidoHTML,
      });

      if (!responseMail) {
        return res.status(400).send("Welcome Email cannot been delivered");
      }
      return res.status(200).send("Payment created");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = createPayment;
