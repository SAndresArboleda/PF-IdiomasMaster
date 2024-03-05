const User = require("../.././database/models/User");
const { cloudinary } = require("../../utils/cloudinary");
const transporter = require("../../nodemailer");
require("dotenv").config();
const fs = require("fs");
const path = require("path");

const putUser = async (req, res) => {
  try {
    const { name, lastname, password, email, img, age, id, profile, status } =
      req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    if (name && name !== user.name) {
      user.name = name;
    }

    if (lastname && lastname !== user.lastname) {
      user.lastname = lastname;
    }

    if (password && password !== user.password && password.length > 5) {
      user.password = password;
    }

    if (email && email !== user.email) {
      user.email = email;
    }

    if (img && img !== user.img) {
      const uploadedImage = await cloudinary.uploader.upload(img, {
        upload_preset: "ml_default",
        folder: "idiomasMaster",
      });
      user.img = uploadedImage.url;
    }

    if (age && age !== user.age) {
      user.age = age;
    }

    if (profile && profile !== user.profile) {
      user.profile = profile;
    }

    if (status !== undefined && user.status !== status) {
      user.status = status;
    }

    await user.save();

    const contenidoHTML = fs.readFileSync(
      path.join(__dirname, "../mail/putUserTemplate.html"),
      "utf-8"
    );

    const response = await transporter.sendMail({
      from: {
        name: "Idiomas Master Admin",
        address: process.env.MAIL_USER,
      },
      to: user.email,
      subject: "Cuenta Actualizada Exitosamente",
      html: contenidoHTML,
    });

    if (!response) {
      return res.status(400).send("Welcome Email cannot been delivered");
    }

    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = putUser;
