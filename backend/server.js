require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const Products = require("./models/products");
const cookieParser = require("cookie-parser");

//database connection
connection();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Use the CORS middleware
app.use(cors({
    credentials: true,
    origin: ["https://levitaion-frontend.vercel.app"],
    methods:["POST","GET","PUT"],
  }));

app.use("/", require("./routes/authRout"));
app.use("/product", require("./routes/productRout"));
app.use("/invoice", require("./routes/invoiceRout"));
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is listning on port ${port}`);
});
