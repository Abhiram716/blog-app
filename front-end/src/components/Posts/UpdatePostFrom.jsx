import React from "react";
import { TextField, Button, Box } from "@mui/material";
import { useFormik } from "formik";
import { useBlogData } from "../../contexts/BlogDataContextProvider";

const UpdatePostFrom = ({ title, content, onCancel, blogId }) => {
  const { updatePost } = useBlogData();
  const formik = useFormik({
    initialValues: {
      title: title,
      content: content,
    },
    onSubmit: async (values) => {
      await updatePost(blogId, values.title, values.content).then(() =>
        onCancel()
      );
    },
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="title"
          name="title"
          // label="Title"
          fullWidth
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.title && formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
          value={formik.values.title}
          sx={{ mt: 3 }}
        />
        <TextField
          id="content"
          name="content"
          // label="Content"
          multiline
          fullWidth
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          rows={10}
          value={formik.values.content}
          error={Boolean(formik.touched.content && formik.errors.content)}
          helperText={formik.touched.content && formik.errors.content}
          sx={{ mt: 3 }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            mt: 3,
            gap: 3,
          }}
        >
          <Button type="submit" variant="contained" disabled={!formik.isValid}>
            Update post
          </Button>
          <Button variant="contained" color="error" onClick={onCancel}>
            cancel
          </Button>
        </Box>
      </form>
    </>
  );
};

export default UpdatePostFrom;
