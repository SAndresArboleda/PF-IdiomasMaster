const { MercadoPagoConfig, Preference, Payment } = require("mercadopago");
const createPayment = require("../createPayment");
const YOUR_ACCESS_TOKEN = process.env.YOUR_ACCESS_TOKEN;

const client = new MercadoPagoConfig({ accessToken: YOUR_ACCESS_TOKEN });

const createPreference = async (req, res) => {
  console.log(req.body);
  let body = {};
  try {
    if (req.body.detail_product) {
      body = {
        items: [
          {
            title: req.body.detail_product.name,
            quantity: 1,
            unit_price: Number(req.body.detail_product.price),
            currency_id: "USD",
          },
        ],
        payer: {
          name: req.body.user.name,
          surname: req.body.user.lastname,
          email: req.body.user.email,
        },
        metadata: {
          course_id: req.body.detail_product.product_id,
          user_id: req.body.user._id,
        },
        back_urls: {
          success: `https://idiomasmaster-toqy.onrender.com/detail/${req.body.detail_product.product_id}`,
          failure: `https://idiomasmaster-toqy.onrender.com/detail/${req.body.detail_product.product_id}`,
          pending: `https://idiomasmaster-toqy.onrender.com/detail/${req.body.detail_product.product_id}`,
        },
        auto_return: "approved",
      };
    } else {
      body = {
        items: [
          {
            title: "Curso(s) en Carrito",
            quantity: 1,
            unit_price: Number(req.body.price),
            currency_id: "USD",
          },
        ],
        metadata: {
          cart_id: req.body.cart_id,
          user_id: req.body.user._id,
        },
        payer: {
          name: req.body.user.name,
          surname: req.body.user.lastname,
          email: req.body.user.email,
        },
        back_urls: {
          success: `https://idiomasmaster-toqy.onrender.com/cart`,
          failure: "https://idiomasmaster-toqy.onrender.com/cart",
          pending: "https://idiomasmaster-toqy.onrender.com/cart",
        },
        auto_return: "approved",
      };
    }

    const preference = new Preference(client);
    const { init_point } = await preference.create({ body });
    res.json(init_point);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error al crear la preferencia :(",
    });
  }
};

module.exports = createPreference;
