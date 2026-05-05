const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// 📝 REGISTER
exports.registerUser = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    // 🔥 normalize email
    email = email.trim().toLowerCase();

    // check existing user
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({
        message: "User already exists ❌"
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // save user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.json({
      message: "Registered successfully ✅"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Register error ❌"
    });
  }
};


// 🔐 LOGIN
exports.loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    // 🔥 normalize email
    email = email.trim().toLowerCase();

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found ❌"
      });
    }

    // password match
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password ❌"
      });
    }

    // token
    const token = jwt.sign(
      { id: user._id },
      "secret123",
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login success ✅",
      token
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error ❌"
    });
  }
};