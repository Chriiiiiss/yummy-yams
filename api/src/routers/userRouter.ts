import express, { Router } from "express";
import {
  handleFetchUserForRanking,
  handleFetchUserInfo,
} from "../controllers/userController.ts";
import { verifyToken } from "src/middleware/verifyToken.ts";

const userRouter = Router();

userRouter.get("/me/:token", handleFetchUserInfo);

userRouter.get("/ranking", handleFetchUserForRanking);

userRouter.use("/", express.static("public"));

export default userRouter;
