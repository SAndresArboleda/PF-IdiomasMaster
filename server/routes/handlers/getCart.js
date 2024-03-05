const Cart = require("../../database/models/Cart");

const getCart = async (req, res) => {
  try {
    const { id } = req.params;

    let cart = await Cart.findOne({ student: id, status: "waiting" }).populate("courses");

    if (!cart) {
      cart = await new Cart({
        student: id,
        status: "waiting",
      }).save();

      return res.status(200).json(cart);
    }

    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
module.exports = getCart;
