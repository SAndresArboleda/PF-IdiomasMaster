const Cart = require("../../database/models/Cart");

const deleteCartProduct = async (req, res) => {
  try {
    const { CourseId, CartId } = req.body;


    let cart = await Cart.findById(CartId);

    if (!cart) {
      return res.status(404).send("Cart doesn't exist");
    }


    cart.courses = cart.courses.filter((element) => element.toString() !== CourseId);

    await cart.save();

    return res.status(200).json(cart)
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = deleteCartProduct;
