import { Container, TextField, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useBlogData } from "../../contexts/BlogDataContextProvider";
import { Link } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";

const NewBlog = () => {
  const { createPost } = useBlogData();
  const formik = useFormik({
    initialValues: { title: "", content: "" },

    validate: (values) => {
      const errors = {};

      if (!values.title) {
        errors.title = "Title is required";
      }

      if (!values.content) {
        errors.content = "Content is required";
      }

      return errors;
    },

    onSubmit: async (values) => {
      await createPost(values.title, values.content);
    },
  });
  return (
    <Container sx={{ p: 5 }}>
      <Button variant="contained" startIcon={<IoChevronBack />}>
        <Link to="/blogs" style={{ textDecoration: "none", color: "white" }}>
          go to Home
        </Link>
      </Button>
      <Typography variant="h3" sx={{ mt: 5, mb: 2 }}>
        Create a new post
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="title"
          name="title"
          label="Title"
          fullWidth
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.title && formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
          sx={{ mt: 3 }}
        />
        <TextField
          id="content"
          name="content"
          label="Content"
          multiline
          fullWidth
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          rows={4}
          error={Boolean(formik.touched.content && formik.errors.content)}
          helperText={formik.touched.content && formik.errors.content}
          sx={{ mt: 3 }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3 }}
          disabled={!formik.isValid}
        >
          Create new post
        </Button>
      </form>
    </Container>
  );
};

export default NewBlog;
