import React from "react";
import { Box, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

const AuthPageLayout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Box>
        <Typography variant="h1">Blogs App</Typography>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AuthPageLayout;
