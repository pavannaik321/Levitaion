const products = require("../models/products");
const Users = require("../models/users");

const getProducts = async (req, res) => {
  try {
    const data = await products.find();

    if (data) {
      return res.status(200).send(data);
    } else {
      return res.status(500).send("no data found");
    }
  } catch (error) {
    console.log(error);
  }
};

// add products to specific users model
// const addProducts = async (req, res) => {
//   const { productId, userId } = req.body;
//   console.log(productId);
//   console.log(userId);
//   const added = await Users.findByIdAndUpdate(
//     userId,
//     {
//       $push: { products: { product: productId, quantity: 1 } },
//     },
//     { new: true }
//   ).populate("products");
//   if (!added) {
//     res.status(404);
//     throw new Error("Product Not Found");
//   } else {
//     res.send(added);
//   }
// };

const addProducts = async (req, res) => {
  const { productId, userId } = req.body;
  console.log(productId);
  console.log(userId);
  const added = await Users.findById(userId).populate("products");

  const existIndex = added.products.findIndex(
    (product) => product.product.toString() === productId.toString()
  );
  if (existIndex !== -1) {
    added.products[existIndex].quantity += 1;
  } else {
    added.products.push({ product: productId, quantity: 1 });
  }
  await added.save();

  if (!added) {
    res.status(404);
    throw new Error("Product Not Found");
  } else {
    res.send(added);
  }
};

module.exports = { getProducts, addProducts };
