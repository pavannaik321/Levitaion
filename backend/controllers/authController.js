const Users = require("../models/users");
const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");

const test = (req, res) => {
  res.json("test is working");
};

// register endpoint
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // check if name is entered
    if (!name) {
      return res.json({
        error: "all fields are required",
      });
    }

    // Check email format with regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.json({
        error: "Invalid email format",
      });
    }

    // Check password format with regex
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      return res.json({
        error:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 6 characters long",
      });
    }

    // Check if password is good
    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and should be at least 6 characters long",
      });
    }

    // Check if email is already in use
    const exist = await Users.findOne({ email });

    if (exist) {
      return res.json({
        error: "Email is already taken",
      });
    }

    // hashing the password before sending it to the database
    const newHashedPassword = await hashPassword(password);

    // create user in the database using create
    const user = await Users.create({
      name,
      email,
      password: newHashedPassword,
    });
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.json({
      error: "An error occurred while registering the user",
    });
  }
};

// login endpoint

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // user exist
    const user = await Users.findOne({ email });
    if (!user) {
      return res.json({
        error: "Email doesnt exist. No user found!",
      });
    }

    // check if the password match
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({
        error: "Password did not match",
      });
    }

    // generate JWT token
    jwt.sign(
      { email: user.email, id: user._id, name: user.name },
      process.env.JWT_SECRET,
      {},
      (err, token) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Failed to create token" });
        }

        // sending token as cookie
        res.cookie("token", token, {}).json(user);
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const getProfile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
};

module.exports = {
  test,
  registerUser,
  loginUser,
  getProfile,
};
