const Cart = require("../../database/models/Cart");

const getShoppedCart = async (req, res) => {
  try {
    const { id } = req.params;

    let cart = await Cart.findById(id).populate("courses");

    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
module.exports = getShoppedCart;
