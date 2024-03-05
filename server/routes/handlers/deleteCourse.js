const Course = require("../../database/models/Course");

const putCourse = async (req, res) => {
  try {
    const { id } = req.body;

    const course = await Course.findById(id);

    if (course) {
      course.status = false;
    }

    await course.save();
    return res.status(200).send("Course has been deactivated");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = putCourse;
