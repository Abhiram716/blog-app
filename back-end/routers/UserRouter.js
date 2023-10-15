import express from "express";
import UserController from "../controllers/UserController.js";
import authenticateAndAttachUserId from "../middleware/authenticateAndAttachUserId.js";

const userRouter = express.Router();

const userControllerInstance = new UserController();
userRouter.get(
  "/id",
  authenticateAndAttachUserId,
  userControllerInstance.getUserId
);
export default userRouter;
