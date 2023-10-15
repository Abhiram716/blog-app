import React, { useEffect } from "react";
import { useBlogData } from "../../contexts/BlogDataContextProvider";
import BlogSkeleton from "../../components/skeletons/BlogSkeleton";
import { Box, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import PostContainer from "../../components/Posts/PostContainer";
import { BiPlus } from "react-icons/bi";
import AsyncOperationStatus from "../../utils/AsyncOperationStatus";

const BlogsPage = () => {
  const { getAllPost, asyncStatus, allPosts } = useBlogData();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await getAllPost();
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [getAllPost]);

  if (asyncStatus === AsyncOperationStatus.pending) {
    return (
      <Container sx={{ p: 5 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 2,
            mb: 5,
          }}
        >
          <Button variant="contained">
            <Link
              to="authored"
              style={{ textDecoration: "none", color: "white" }}
            >
              Your Posts
            </Link>
          </Button>
          <Button variant="contained" startIcon={<BiPlus />}>
            <Link to="new" style={{ textDecoration: "none", color: "white" }}>
              create new post
            </Link>
          </Button>
        </Box>
        <BlogSkeleton cards={8} />;
      </Container>
    );
  }

  return (
    <Container sx={{ p: 5 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Button variant="contained">
          <Link
            to="authored"
            style={{ textDecoration: "none", color: "white" }}
          >
            Your Posts
          </Link>
        </Button>
        <Button variant="contained" startIcon={<BiPlus />}>
          <Link to="new" style={{ textDecoration: "none", color: "white" }}>
            create new post
          </Link>
        </Button>
      </Box>
      <Box>
        {allPosts.map((blog) => (
          <Box key={blog._id} sx={{ mt: 5 }}>
            <PostContainer title={blog.title} content={blog.content} />
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default BlogsPage;
