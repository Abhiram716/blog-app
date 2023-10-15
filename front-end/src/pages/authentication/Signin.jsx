import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { Link } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContextProvider";

const Signin = () => {
  const theme = useTheme();
  const { signin, asyncStatus } = useAuth();
  const [response, setResponse] = useState();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      let res = await signin(values.email, values.password);
      setResponse(res);
    },
    validate: (values) => {
      const errors = {};

      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }

      if (!values.password) {
        errors.password = "Required";
      }

      return errors;
    },
  });

  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <h4>Don't have an account?</h4>
        <Link to="/auth/signup">Signup</Link>
      </Box>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            boxSizing: "border-box",
            m: 5,
          }}
        >
          <TextField
            id="email"
            name="email"
            label="Email"
            margin="dense"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <MdAlternateEmail />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="password"
            name="password"
            label="password"
            type="password"
            margin="dense"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <FaLock />
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained" type="submit" disabled={!formik.isValid}>
            {asyncStatus === "pending" ? (
              <CircularProgress
                size={24}
                sx={{ color: theme.palette.primary.contrastText }}
              />
            ) : (
              "Submit"
            )}
          </Button>
          {asyncStatus === "success" || asyncStatus === "failure" ? (
            <Alert
              severity={asyncStatus === "success" ? "success" : "error"}
              sx={{ mt: 2 }}
            >
              <AlertTitle>
                {asyncStatus === "success"
                  ? "Signin successful"
                  : "Signin failed"}
              </AlertTitle>
              {response}
            </Alert>
          ) : null}
        </Box>
      </form>
    </>
  );
};

export default Signin;
