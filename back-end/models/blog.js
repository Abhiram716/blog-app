import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    min: 4,
  },
  content: {
    type: String,
    required: true,
    min: 12,
  },
});

export default mongoose.model("Blogs", blogSchema);
