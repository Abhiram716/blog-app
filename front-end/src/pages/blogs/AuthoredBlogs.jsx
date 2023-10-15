import { Box, Button, Container, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostContainer from "../../components/Posts/PostContainer";
import { useBlogData } from "../../contexts/BlogDataContextProvider";
import AsyncOperationStatus from "../../utils/AsyncOperationStatus";
import BlogSkeleton from "../../components/skeletons/BlogSkeleton";

const AuthoredBlogs = () => {
  const { getAllPostsByUser, authoredPosts, asyncStatus } = useBlogData();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getAllPostsByUser();
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [getAllPostsByUser]);

  if (asyncStatus === AsyncOperationStatus.pending) {
    return (
      <Container sx={{ p: 5 }}>
        <Button variant="contained" sx={{ mb: 5 }}>
          <Link to="/blogs" style={{ textDecoration: "none", color: "white" }}>
            Home Page
          </Link>
        </Button>
        <BlogSkeleton cards={8} />;
      </Container>
    );
  }

  return (
    <Container sx={{ p: 5 }}>
      <Button variant="contained">
        <Link to="/blogs" style={{ textDecoration: "none", color: "white" }}>
          Home Page
        </Link>
      </Button>

      <Box>
        {authoredPosts.map((blog) => (
          <Box key={blog._id} sx={{ mt: 5 }}>
            <PostContainer
              title={blog.title}
              content={blog.content}
              type={"authored"}
              blogId={blog._id}
            />
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default AuthoredBlogs;
