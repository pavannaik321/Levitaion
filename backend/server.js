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

// app.use(cors());

// // create products
// const newProducts = new Products({
//   product_name: "body wise",
//   product_rate: 199,
// });

// // save the user to database
// newProducts
//   .save()
//   .then((user) => {
//     console.log("user created");
//   })
//   .catch((error) => {
//     console.log("error : ", error);
//   });

app.use("/", require("./routes/authRout"));
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is listning on port ${port}`);
});
