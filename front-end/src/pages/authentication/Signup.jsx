import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { FaLock, FaPhoneAlt, FaUserAlt } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { Link } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContextProvider";

const Signup = () => {
  const theme = useTheme();
  const { signup, asyncStatus } = useAuth();
  const [response, setResponse] = useState();

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      mobileNumber: "",
      password: "",
      confirmPassword: "",
      gender: "",
    },

    onSubmit: async (values) => {
      let res = await signup(values);
      setResponse(res);
    },
    validate: (values) => {
      const errors = {};
      if (!values.userName) {
        errors.userName = "Required";
      } else if (values.userName.length < 2) {
        errors.userName = "Username must be of length greater than 2";
      } else if (values.userName.length > 20) {
        errors.userName = "Username must be of length less than 15";
      }

      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }

      if (!values.mobileNumber) {
        errors.mobileNumber = "Required";
      } else if (!/^\d{10}$/i.test(values.mobileNumber)) {
        errors.mobileNumber = "Invalid phone number (10 digits required)";
      }

      if (!values.password) {
        errors.password = "Required";
      }

      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }

      return errors;
    },
  });
  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <h4>already have an account?</h4>
        <Link to="/auth/signin">Signin</Link>
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
            id="userName"
            name="userName"
            label="userName"
            margin="dense"
            value={formik.values.userName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.userName && Boolean(formik.errors.userName)}
            helperText={formik.touched.userName && formik.errors.userName}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <FaUserAlt />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="mobileNumber"
            name="mobileNumber"
            label="Phone Number"
            margin="dense"
            value={formik.values.mobileNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)
            }
            helperText={
              formik.touched.mobileNumber && formik.errors.mobileNumber
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <FaPhoneAlt />
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
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            margin="dense"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <FaLock />
                </InputAdornment>
              ),
            }}
          />
          <RadioGroup
            id="gender"
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <FormControlLabel
              value="Male"
              control={<Radio />}
              label="Male"
              labelPlacement="end"
            />
            <FormControlLabel
              value="Female"
              control={<Radio />}
              label="Female"
              labelPlacement="end"
            />
            <FormControlLabel
              value="Other"
              control={<Radio />}
              label="Other"
              labelPlacement="end"
            />
          </RadioGroup>

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
                  ? "Signup successful"
                  : "Signup failed"}
              </AlertTitle>
              {response}
              {asyncStatus === "success" ? ",you can sigin now" : null}
            </Alert>
          ) : null}
        </Box>
      </form>
    </>
  );
};

export default Signup;
