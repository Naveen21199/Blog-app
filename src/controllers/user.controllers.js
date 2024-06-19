import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";

const userRegister = asyncHandler(async (req, res) => {
  //validation
  const { name, email, password } = req.body;
  if ([name, email, password].some((fields) => fields.trim() === "")) {
    throw new ApiError(400, "Please provide all fields");
  }

  //exiting user
  const exisitingUser = await User.findOne({ email });
  if (exisitingUser) {
    throw new ApiError(401, "User already registered");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  //save user
  const user = await User.create({
    name,
    email,
    password: hashPassword,
  });
  return res
    .status(201)
    .json(new ApiResponse(200, user, "User Registered Successfully"));
});

// get all user
const getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find({});
  return res.status(200).json(new ApiResponse(200, users, "All users found"));
});

// user login
const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User does not exist");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid username or pasword");
  }

  return res.status(200).json(new ApiResponse(200, user, "Login Successfully"));
});

export { getAllUser, userRegister, userLogin };
