const express = require("express");
const router = express.Router();
const cors = require("cors");
const { InvoiceDetails } = require("../controllers/InvoiceController");

// middleware
  cors({
    credentials: true,
    origin: ["https://deploy-mern-1whq.vercel.app"],
    methods:["POST","GET","PUT"],
  })
);

// routes
router.get("/:userId", InvoiceDetails);

module.exports = router;
