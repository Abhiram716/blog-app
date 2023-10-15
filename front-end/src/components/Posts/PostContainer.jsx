import { Typography, Box, Button } from "@mui/material";
import React, { useState } from "react";
import { useBlogData } from "../../contexts/BlogDataContextProvider";
import UpdatePostFrom from "./UpdatePostFrom";

const PostContainer = ({ title, content, type, blogId }) => {
  const [updatePost, setUpdatePost] = useState(false);
  const { deletePost } = useBlogData();
  const handleDeletePost = async () => {
    await deletePost(blogId);
  };

  const handleUpdate = () => {
    setUpdatePost(true);
  };

  const handleCancel = () => {
    setUpdatePost(false);
  };
  return (
    <>
      {updatePost ? (
        <UpdatePostFrom
          title={title}
          content={content}
          blogId={blogId}
          onCancel={handleCancel}
        />
      ) : (
        <>
          <Typography variant="h4">{title}</Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {content}
          </Typography>
          {type === "authored" && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 2,
                mt: 2,
              }}
            >
              <Button variant="contained" onClick={handleUpdate}>
                Update Post
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleDeletePost}
              >
                Delete Post
              </Button>
            </Box>
          )}
          <Box
            sx={{ mt: 2, display: "block", borderBottom: "1px solid black" }}
          />
        </>
      )}
    </>
  );
};
export default PostContainer;
