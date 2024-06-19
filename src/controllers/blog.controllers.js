import { json } from "express";
import { Blog } from "../models/blog.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";

//get all blogs
const getAllBlog = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({});
  if (!blogs) {
    throw new ApiError("404", "No blogs found");
  }
  return res.status(201).json(new ApiResponse(200, blogs, "All blogs fetched"));
});

// create blog
const createBlog = asyncHandler(async (req, res) => {
  const { title, description, image, user } = req.body;

  if (!title || !description || !image || !user) {
    throw new ApiError(400, "Please Provide all fields");
  }

  const exisitingUser = await User.findById(user);
  if (!exisitingUser) {
    throw new ApiError(404, "unable to find user");
  }

  //   const newBlog = await Blog({ title, description, image });
  const blog = await Blog.create({
    title,
    description,
    image,
    user: exisitingUser._id,
  });
  exisitingUser.blogs.push(blog);
  await exisitingUser.save();

  return res
    .status(201)
    .json(new ApiResponse(200, blog, "Blog created successfully"));
});

//update blog
const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findByIdAndUpdate(id, { ...req.body }, { new: true });
  return res
    .status(201)
    .json(new ApiResponse(200, blog, "Blog updated successfully"));
});

//delete blog
const deleteBlog = asyncHandler(async (req, res) => {
  // const { id } = req.params;
  // console.log(id);
  // const blog = await Blog.findOneAndDelete(id).populate("user");
  const blog = await Blog.findByIdAndDelete(req.params.id).populate("user");
  console.log(blog);
  await blog.user.blogs.pull(blog);
  await blog.user.save();
  console.log(blog);

  return res
    .status(201)
    .json(new ApiResponse(200, blog, "Blog deleted successfully"));
});

// get blog by id
const getBlogById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new ApiError(404, "blog not found with this id");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, blog, "Fecthed single blog"));
});

//user blog
const userBlogController = asyncHandler(async (req, res) => {
  const userBlog = await User.findById(req.params.id).populate("blogs");
  if (!userBlog) {
    throw new ApiError(404, "Blogs not found with this id");
  }
  return res.status(200).json(new ApiResponse(200, userBlog, "User blogs"));
});

export {
  getAllBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogById,
  userBlogController,
};
