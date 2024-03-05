const Review = require("../../database/models/Reviews");

const getReviews = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    return res.status(200).json(review);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = getReviews;
