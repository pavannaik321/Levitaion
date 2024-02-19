const { default: mongoose } = require("mongoose");
const mongoode = require("mongoose");

module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    mongoose.connect(""mongodb+srv://pavanpnaik321:pavanpnaik321@cluster0.kj6oxbh.mongodb.net/?retryWrites=true&w=majority"");
    console.log("connected to database successfully");
  } catch (error) {
    console.log("could not connect to database");
  }
};
