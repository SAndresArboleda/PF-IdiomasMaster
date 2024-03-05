const Course = require("../../database/models/Course");
const mongoose = require('mongoose');

const deleteUserCourse = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    const course = await Course.findById(courseId);

    if (!course.students.includes(userId)) {
      return res.status(400).send("User is not in the course");
    }

    const userIdObjectId = new mongoose.Types.ObjectId(userId);

    course.students = course.students.filter(
      (id) => !id.equals(userIdObjectId)
    );

    await course.save();

    return res.status(200).send("User remove successfully from the course");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = deleteUserCourse;
