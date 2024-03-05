const User = require("../.././database/models/User");

const getUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const passwordUser = await User.findOne({ password });
    if (user && !user.status) {
      return res
        .status(405)
        .json({ message: "Usuario Desactivado, por favor pongase en contacto con su administrador." });

        
    } else {
      if (user && passwordUser) {
        return res.status(200).json(user);
      } else {
        return res.status(400).json({
          message:
            "Error al iniciar sesión El correo electrónico/contraseña que ingresó es incorrecto. Verifique sus credenciales o intente utilizar un método diferente para iniciar sesión.",
        });
      }
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = getUser;