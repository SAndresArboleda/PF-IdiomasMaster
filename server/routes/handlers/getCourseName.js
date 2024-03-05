const Course = require("../.././database/models/Course");

const getCourseByName = async (req, res) => {
  try {
    const { name } = req.query;

    const course = await Course.find({
      language: { $regex: new RegExp(name, 'i') }
    });

    if (course.length === 0) {
      return res
        .status(200)
        .send(`We don't have courses in the language: ${name}`);
    }

    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = getCourseByName;