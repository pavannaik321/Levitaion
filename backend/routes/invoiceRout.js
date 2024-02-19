const express = require("express");
const router = express.Router();
const cors = require("cors");
const { InvoiceDetails } = require("../controllers/InvoiceController");

// middleware
router.use(
  cors({
    credentials: true,
    origin: ["https://levitation.vercel.app"],
    methods:["POST","GET","PUT"],
  })
);

// routes
router.get("/:userId", InvoiceDetails);

module.exports = router;
