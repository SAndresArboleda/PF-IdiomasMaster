const Reviews = require("../../database/models/Reviews")

const getAllReviews = async (req, res) => {

    try{

        const allReviews = await Reviews.find({})

        return res.status(200).json(allReviews);


    }catch(error){
        return res.status(500).send(error.message)
    }
}

module.exports = getAllReviews;