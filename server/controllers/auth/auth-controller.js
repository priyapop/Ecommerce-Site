const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

//register
const registerUser = async (req, res) => {
 
  const { UserName, email, password } = req.body;


  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      UserName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration successful",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "error",
    });
  }
};

//login
const login = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "error",
    });
  }
};

//logout
//authmiddlewear

module.exports = { registerUser };
