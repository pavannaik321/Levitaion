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
    origin: "http://localhost:5173",
  })
);

router.get("/", getProducts);
router.put("/addproduct", addProducts);

module.exports = router;
