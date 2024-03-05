const Course = require("../../database/models/Course")

const getAllCourses = async (req, res) => {

    try{

        const allCourses = await Course.find({})

        return res.status(200).json(allCourses);


    }catch(error){
        return res.status(500).send(error.message)
    }
}

module.exports = getAllCourses;