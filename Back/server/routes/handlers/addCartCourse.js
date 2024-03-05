const Cart = require("../../database/models/Cart");

const addCartProduct = async (req, res) => {
  try {
    const { CoursesArray, CartId } = req.body;

  
    console.log(CartId)
    console.log(CoursesArray)

    let cart = await Cart.findById(CartId);

    console.log(cart)
    console.log(CartId)
    console.log(CoursesArray)

    if (!cart) {
      return res.status(404).send("Cart doesn't exist");
    }


    if (cart.status === 'shopped') {
      return res.status(400).send("Cannot modify a shopped cart");
    }

    // Agregar el curso al carrito
    cart.courses = CoursesArray || [];
    await cart.save();

    return res.status(200).json(cart);

  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = addCartProduct;
