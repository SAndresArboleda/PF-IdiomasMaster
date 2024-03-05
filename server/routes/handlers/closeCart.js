const Cart = require("../../database/models/Cart");

const closeCart = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedCart = await Cart.findByIdAndUpdate(id, {
      status: "shopped",
    });

    if (!updatedCart) {
      return res.status(404).send("Cart doesn't exist");
    }

    return res.status(200).send("Cart has been closed");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = closeCart;
