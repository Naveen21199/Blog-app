import { Router } from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlog,
  getBlogById,
  updateBlog,
  userBlogController,
} from "../controllers/blog.controllers.js";
// import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

router.get("/all-blog", getAllBlog);

router.post("/create-blog", createBlog);
router.put("/update-blog/:id", updateBlog);
router.delete("/delete-blog/:id", deleteBlog);
router.get("/get-blog/:id", getBlogById);

// get || user blog
router.get("/user-blog/:id", userBlogController);

export default router;
