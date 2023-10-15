import express from "express";
import authenticateUser from "../middleware/authenticateUser.js";
import BlogController from "../controllers/BlogController.js";

const blogControllerInstance = new BlogController();
const blogRouter = express.Router();

blogRouter.get(
  "/user/:userId",
  authenticateUser,
  blogControllerInstance.getAllBlogs
);

blogRouter.get(
  "/user/:userId/authored",
  authenticateUser,
  blogControllerInstance.getAllUserBlogs
);

blogRouter.post(
  "/user/:userId",
  authenticateUser,
  blogControllerInstance.createBlog
);

blogRouter.put(
  "/update/:id",
  authenticateUser,
  blogControllerInstance.updateBlog
);

blogRouter.delete(
  "/delete/:id",
  authenticateUser,
  blogControllerInstance.deleteBlog
);

export default blogRouter;
