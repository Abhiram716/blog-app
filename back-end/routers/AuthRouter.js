import express from "express";

import AuthController from "../controllers/Authcontroller.js";
const AuthRouter = express.Router();

const authControllerInstance = new AuthController();

AuthRouter.post("/signin", authControllerInstance.createAccessToken);
AuthRouter.post("/signup", authControllerInstance.createAccount);

export default AuthRouter;
