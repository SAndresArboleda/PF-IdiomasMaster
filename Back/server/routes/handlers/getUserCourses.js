const Course = require("../.././database/models/Course");

const getUserCourses = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)

    const course = await Course.find({ students: id });

    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = getUserCourses;
