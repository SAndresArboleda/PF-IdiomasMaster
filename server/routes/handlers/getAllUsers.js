const User = require("../../database/models/User")

const getAllUsers = async (req, res) => {

    try{

        const allusers = await User.find({})

        return res.status(200).json(allusers);


    }catch(error){
        return res.status(500).send(error.message)
    }
}

module.exports = getAllUsers;