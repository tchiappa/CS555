import express from "express";
import {
  createUserHandler,
  getCurrentUserHandler,
} from "../controllers/userController.js";
import { userRequired } from "../middlewares/userRequired.js";
import { deserializeUser } from "../middlewares/deserializeUser.js";

const userRouter = express.Router();

userRouter.post("/user", createUserHandler);

export default userRouter;
