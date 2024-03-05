const Reviews = require("../.././database/models/Reviews");

const putReview = async (req, res) => {
  try {
    const { rating, body, reply, view } = req.body;
    const { reviewId } = req.params;

    const review = await Reviews.findById(reviewId);

    if (!review) {
      return res.status(404).send("Revisión no encontrada");
    }

    if (rating) {
      review.rating = rating;
    }

    if (body) {
      review.body = body;
    }

    if (reply) {
      review.reply = reply;
    }

    if (view !== undefined && review.view !== view) {
      review.view = view;
    }

    await review.save();

    return res
      .status(200)
      .send("La revisión ha sido actualizada correctamente");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = putReview;
