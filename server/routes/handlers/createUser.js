const User = require("../../database/models/User");
const { cloudinary } = require("../../utils/cloudinary");
const transporter = require("../../nodemailer");
require("dotenv").config();
const fs = require("fs");
const path = require("path");

const createUser = async (req, res) => {
  try {
    const { name, lastname, age, email, password, img } = req.body;

    let imageUrl = "";

    if (typeof img === "object" && img.data) {
      const uploadedImage = await cloudinary.uploader.upload(img.data, {
        upload_preset: "ml_default",
        folder: "idiomasMaster" // carpeta que se crea en cloudinary
      });
      imageUrl = uploadedImage.url;
    }


    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(400).send('El email ya está en uso.');
    }

    const newUser = new User({
      name,
      lastname,
      age,
      email,
      password,
      img: imageUrl,
    });

    await newUser.save();

    const contenidoHTML = fs.readFileSync(
      path.join(__dirname, "../mail/welcomeTemplate.html"),
      "utf-8"
    );

    const response = await transporter.sendMail({
      from: {
        name: "Idiomas Master Admin",
        address: process.env.MAIL_USER,
      },
      to: email,
      subject: "Bienvenido a Idiomas Master",
      html: contenidoHTML,
    });

    if (!response) {
      return res.status(400).send("Welcome Email cannot been delivered");
    }

    return res.status(200).send(`User created: ${name} ${lastname}`);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = createUser;
