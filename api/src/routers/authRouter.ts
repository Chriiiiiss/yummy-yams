import { Router } from "express";
import { handleLogin } from "../controllers/authController";

const authRouter = Router();

authRouter.get("/login", handleLogin);

export default authRouter;
