const { default: mongoose } = require("mongoose");
const mongoode = require("mongoose");

module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    mongoose.connect(process.env.DB);
    console.log("connected to database successfully");
  } catch (error) {
    console.log("could not connect to database");
  }
};
