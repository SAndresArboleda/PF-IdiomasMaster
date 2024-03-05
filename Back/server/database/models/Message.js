const { Schema, model } = require(`mongoose`)


const MessageShema = new Schema({
    message: String,
    from: String
}) 

module.exports = model("Message", MessageShema);