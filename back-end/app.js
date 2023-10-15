import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import AuthRouter from "./routers/AuthRouter.js";
import blogRouter from "./routers/blogRouter.js";
import userRouter from "./routers/UserRouter.js";

dotenv.config();

const app = express();

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB.");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// for parsing application/json
app.use(express.json());

// for parsing application/xwww-
app.use(express.urlencoded({ extended: true }));
//form-urlencoded

app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/auth/", AuthRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/user", userRouter);

app.listen(process.env.PORT | 8000);
