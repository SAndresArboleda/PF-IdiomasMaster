const Message = require("../../database/models/Message");


  //Funcion para obtener todos los mensajes
  const getMessage = async (req, res) => {
    try {
        const messages = await Message.find({}).sort({ _id: -1 });

        if (messages.length === 0) {
            return res.status(404).send({
                status: 'Error',
                message: 'No hay mensajes que mostrar'
            });
        }

        return res.status(200).send({
            status: 'Success',
            messages
        });
    } catch (error) {
        console.error('Error al extraer los datos:', error);
        return res.status(500).send({
            status: 'Error',
            message: 'Error al extraer los datos'
        });
    }
}

module.exports = getMessage;