const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
  },
  product_rate: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Products", ProductsSchema);
