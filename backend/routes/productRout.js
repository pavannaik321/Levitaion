const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
  getProducts,
  addProducts,
} = require("../controllers/productController");

router.use(
  cors({
    credentials: true,
    origin: ["https://levitaion-frontend.vercel.app"],
    methods:["POST","GET","PUT"],
  })
);
router.get("/", getProducts);
router.put("/addproduct", addProducts);

module.exports = router;
