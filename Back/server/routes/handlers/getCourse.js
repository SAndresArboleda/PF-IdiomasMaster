const Course = require("../.././database/models/Course");

const getCourseByID = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);

    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = getCourseByID;
