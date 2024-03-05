const User = require('../.././database/models/User');
const transporter = require("../../nodemailer")
require("dotenv").config();
const fs = require("fs");
const path = require("path");

const deletUser = async (req, res) => {
    try {
        const { id, email, password } = req.body; 

        const user = await User.findById(id);


        if (!user) {
            return res.status(404).json({ message: 'User do not exist' });
        }

        if(user.email === email && user.password === password){

          user.status = false;

          await user.save();
  
          const contenidoHTML = fs.readFileSync(
              path.join(__dirname, "../mail/noUserTemplate.html"),
              "utf-8"
            );
        
            const response = await transporter.sendMail({
              from: {
                name: "Idiomas Master Admin",
                address: process.env.MAIL_USER,
              },
              to: user.email, 
              subject: "Cuenta desactivada Exitosamente", 
              html: contenidoHTML, 
            });
  
            if (!response) {
              return res.status(400).send("Welcome Email cannot been delivered");
            }
  
          return res.status(200).json({status: true, message: "El usuario ha sido desactivado"});


        }

        return res.status(400).json({status: false, message:"Ingresa tus credenciales Correctamente"});
       
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = deletUser;
