const Course = require("../../database/models/Course");

const AddUserCourse = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).send("Course doesn't exist");
    }

    if (course.students.includes(userId)) {
      return res.status(400).send("User already is in the Course");
    }

    course.students.push(userId);
    await course.save();

    return res.status(200).send("User add to the course successfully");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = AddUserCourse;
