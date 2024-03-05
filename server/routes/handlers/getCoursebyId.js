const Course = require("../.././database/models/Course");

const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);

    if (!course) {
      return res
        .status(200)
        .send(`We don't have courses in the language: ${name}`);
    }

    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = getCourseById;
