const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { body, validationResult, check } = require("express-validator");

const createToken = (_id) => {
  return jwt.sign({ id: _id }, process.env.HASH, { expiresIn: "3d" });
};

const login = async (req, res) => {
  try {
    const validateError = validationResult(req);
    if (!validateError.isEmpty()) {
      return res.status(400).json({ error: validateError.array() });
    }
    const { username, password } = req.body;

    // check if user exist
    const user = await User.findOne({ username });
    if (!user) {
      throw Error("Account doesn't exist");
    }

    // compare the password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw Error("Invalid login credentials");
    }

    const token = createToken(user._id);
    res.cookie("auth_token", token, {
      maxAge: 2 * 86400000,
    });

    res
      .status(200)
      .json({ message: "Login Success", userID: user._id, username, token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

const register = async (req, res) => {
  try {
    const validateError = validationResult(req);
    if (!validateError.isEmpty()) {
      return res.status(400).json({ error: validateError.array() });
    }

    const { username, email, password, createdAt } = req.body;

    // check if user exist
    const checkUser = await User.findOne({ username: username, email: email });
    if (checkUser) {
      return res.status(400).json({ message: "Username already exist" });
    }

    // hashing
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const createUser = await User.create({
      username,
      email,
      password: hash,
      createdAt,
    });

    const token = createToken(user._id);
    res.cookie("auth_token", token, {
      maxAge: 2 * 86400000, // expired in 2 days
    });

    return res.status(200).json({ message: "User register success" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

module.exports = {
  login,
  register,
};
