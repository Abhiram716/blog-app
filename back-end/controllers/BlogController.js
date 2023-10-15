import Blogs from "../models/blog.js";
import user from "../models/user.js";

class BlogController {
  getAllBlogs = async (req, res) => {
    try {
      const blogs = await Blogs.find();
      if (blogs.length === 0) {
        return res.status(404).json({ error: "No blogs are posted yet!" });
      }
      return res.status(200).json(blogs);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  };

  getAllUserBlogs = async (req, res) => {
    try {
      const userId = req.params.userId;
      const blogs = await Blogs.find({ userId });

      if (blogs.length === 0) {
        return res
          .status(404)
          .json({ error: "No blogs found written by this user" });
      }
      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  createBlog = async (req, res) => {
    try {
      const userId = req.params.userId;
      const validUser = await user.findById(userId);
      if (!validUser) {
        return res.status(400).json({ error: "user not found" });
      }
      const { title, content } = req.body;
      if (!title || !content) {
        return res
          .status(400)
          .json({ error: "Title and content are required" });
      }
      const blog = await Blogs.create({ ...req.body, userId: userId });

      return res.status(201).json(blog);
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  updateBlog = async (req, res) => {
    try {
      const updatedBlog = await Blogs.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      return res.status(200).json(updatedBlog);
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  deleteBlog = async (req, res) => {
    try {
      const blogId = req.params.id;
      const blog = await Blogs.findById(blogId);

      if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
      }
      await Blogs.findByIdAndDelete(req.params.id);

      return res.status(200).json({ msg: "Successfully deleted blog" });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

export default BlogController;
