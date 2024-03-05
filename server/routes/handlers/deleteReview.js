const Review = require("../../database/models/Reviews");

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.deleteOne({ _id: id });

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    return res.status(200).send("Review has been deleted");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = deleteReview;
