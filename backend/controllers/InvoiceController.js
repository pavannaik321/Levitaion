const users = require("../models/users");

const InvoiceDetails = async (req, res) => {
  try {
    const { userId } = req.params;
    const data = await users
      .findOne({ _id: userId })
      .populate("products.product");

    if (data) {
      const productsWithQuantity = data.products.map((product) => ({
        quantity: product.quantity,
        ...product.product._doc,
      }));

      return res.status(200).json(productsWithQuantity);
    } else {
      return res.status(404).send("User not found");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = { InvoiceDetails };
