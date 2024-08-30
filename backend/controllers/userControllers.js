const asyncHandler = require('express-async-handler');
const User = require("../models/userModel");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const JWT_SECRET = process.env.JWT_SECRET;

// Input validation with zod
const usernameSchema = zod.string();
const emailSchema = zod.string().email();
const passwordSchema = zod.string().min(6);

// ----------------- GENERATE JWT TOKEN ----------------
function generateToken(id, username, email) {
  return jwt.sign({ id, username, email }, JWT_SECRET, { expiresIn: "1d" });
}

// ----------------- REGISTER USER ----------------
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (
    usernameSchema.safeParse(username).success === false ||
    passwordSchema.safeParse(password).success === false ||
    emailSchema.safeParse(email).success === false
  ) {
    res.status(404);
    throw new Error("Invalid inputs!!");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(404);
    throw new Error("User already exists!!");
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  const token = generateToken(user._id, user.username, user.email);

  return res.status(201).json({
    message: "User created successfully!!",
    token,
  });
});

// ----------------- LOGIN USER ----------------
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (
    passwordSchema.safeParse(password).success === false ||
    emailSchema.safeParse(email).success === false
  ) {
    res.status(404);
    throw new Error("Invalid inputs!!");
  }

  const userExists = await User.findOne({ email });

  if (!userExists) {
    res.status(404);
    throw new Error("User does not exists, please register!!");
  }

  const validPassword = await bcrypt.compare(password, userExists.password);
  if (!validPassword) {
    res.status(404);
    throw new Error("Invalid password!!");
  }

  const token = generateToken(
    userExists._id,
    userExists.username,
    userExists.email
  );

  return res.status(200).json({
    message: "Logged in successfully!!",
    token,
  });
});
// ----------------- GET USER  ----------------

const getUser = asyncHandler(async (req, res) => {
  const user = req.user;
  res.status(200).json({
    user,
  });
});

// ----------------- HOME PAGE ----------------
const home = asyncHandler(async (req, res) => {
  return res.status(200).json({
    message: "This line can be seen because you have a valid token",
  });
});

module.exports = {
  registerUser,
  loginUser,
  home,
  getUser,
};