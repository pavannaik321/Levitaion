const users = require("../models/users");

const InvoiceDetails = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const data = await users.findOne({ _id: userId }).populate("products");

    if (data) {
      return res.status(200).send(data);
    } else {
      return res.status(404).send("User not found");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = { InvoiceDetails };
