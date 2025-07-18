const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

// Register
const register = async (req, res) => {
  try {
    const { userName, email, phone, password } = req.body;

    if (!userName || !email || !phone || !password) {
      return res.status(400).json({
        message: "All fields are require",
      });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      userName,
      email,
      phone,
      password: hashPassword,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        userName: user.userName,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email or password or required",
      });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (!existingUser) {
      return res.status(401).json({
        message: "Email not register",
      });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Email or Password is incorrect",
      });
    }

    const token = await jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Login successfylly",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { register, login };
