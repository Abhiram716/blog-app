import { Skeleton, Box } from "@mui/material";
import React from "react";

const BlogSkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((_, index) => (
      <Box sx={{ mb: 10 }} key={index}>
        <Skeleton variant="rounded" animation="wave" height={50} />
        <Skeleton
          variant="rounded"
          animation="wave"
          sx={{ mt: 2 }}
          height={200}
        />
      </Box>
    ));
};

export default BlogSkeleton;
