const Review = require("../../database/models/Reviews");

const getCourseReviews = async (req, res) => {
  try {
    const { id } = req.params;

    const userReviews = await Review.find({ course_review: id });

    return res.status(200).json(userReviews);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = getCourseReviews;
