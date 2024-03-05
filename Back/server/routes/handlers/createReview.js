const Review = require("../.././database/models/Reviews");
const Course = require("../.././database/models/Course");
const transporter = require("../../nodemailer");
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const User = require("../.././database/models/User");

const createReview = async (req, res) => {
  try {
    const { rating, body, user_id, course_id, user_name, user_lastname, user_img } = req.body;
    console.log("hola-->", user_img )
    const newReview = new Review({
      rating,
      body,
      student_review: user_id,
      course_review: course_id,
      student_img: user_img,
      student_name: user_name,
      student_lastname: user_lastname
    });

    if (!newReview) {
      return res.status(400).send("Invalid review data");
    }

    await newReview.save();

    const course = await Review.find({ course_review: course_id });

    let totalRating = 0;

    for (const review of course) {
      totalRating += review.rating;
    }

    const courseRating = Math.floor(totalRating / course.length);

    const myCourse = await Course.findById(course_id);

    if (!myCourse) {
      return res.status(404).send("Course not found");
    }

    myCourse.rank = courseRating;
    
    await myCourse.save();

    const user = await User.findById(user_id);

    const contenidoHTML = fs.readFileSync(
      path.join(__dirname, "../mail/postReview.html"),
      "utf-8"
    );

    const response = await transporter.sendMail({
      from: {
        name: "Idiomas Master Admin",
        address: process.env.MAIL_USER,
      },
      to: user.email,
      subject: "Gracias por tus Comentarios",
      html: contenidoHTML,
    });

    if (!response) {
      return res.status(400).send("Welcome Email cannot been delivered");
    }

    return res.status(200).send(`Review created`);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = createReview;
