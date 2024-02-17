require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");

//database connection
connection();

//middlewares
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is listning on port ${port}`);
});
