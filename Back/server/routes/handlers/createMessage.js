const Message = require("../../database/models/Message");

const createMessage = async (req, res) => {
    try {
        const { message, from } = req.body;

        const newMessage = new Message({
            message,
            from
        });

        const messageStored = await newMessage.save();

        return res.status(200).send({
            status: 'Success',
            messageStored
        });
    } catch (error) {
        console.error('Error al guardar el mensaje:', error);
        return res.status(500).send({
            status: 'Error',
            message: 'No ha sido posible guardar el mensaje'
        });
    }
};

module.exports = createMessage;