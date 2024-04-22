import { Router } from "express";
import { handleLogin, handleRegister } from "../controllers/authController";

const authRouter = Router();

authRouter.get("/login", handleLogin);

authRouter.get("/register", handleRegister);

export default authRouter;
