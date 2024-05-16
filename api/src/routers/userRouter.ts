import { Router } from "express";
import { handleFetchUserInfo } from "../controllers/userController.ts";

const userRouter = Router();

userRouter.get("/me/:token", handleFetchUserInfo);

export default userRouter;
