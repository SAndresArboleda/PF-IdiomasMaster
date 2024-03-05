const Course = require("../.././database/models/Course");
const { cloudinary } = require("../../utils/cloudinary");

const putCourse = async (req, res) => {
  try {
    const {
      id,
      language,
      level,
      price,
      duration,
      schedule,
      location,
      image,
      status,
      start_time,
      finish_time,
    } = req.body;

    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).send("Course not found");
    }

    if (language && course.language !== language) {
      course.language = language;
    }

    if (level && course.level !== level) {
      course.level = level;
    }

    if (price && course.price !== price) {
      course.price = price;
    }

    if (duration && course.duration !== duration) {
      course.duration = duration;
    }

    if (start_time && course.start_time !== start_time) {
      course.start_time = start_time;
    }

    if (finish_time && course.finish_time !== finish_time) {
      course.finish_time = finish_time;
    }

    if (location && course.location !== location) {
      course.location = location;
    }

    if (schedule && course.schedule !== schedule) {
      course.location = schedule;
    }

    if (image && course.image !== image) {
      const uploadedImage = await cloudinary.uploader.upload(image, {
        upload_preset: "ml_default",
        folder: "idiomasMaster",
      });
      course.image = uploadedImage.url;
    }

    if (status !== undefined && course.status !== status) {
      course.status = status;
    }

    await course.save();

    return res.status(200).send("Course has been updated");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = putCourse;
