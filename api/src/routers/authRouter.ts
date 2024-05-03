import { Router } from "express";
import { handleLogin, handleRegister } from "../controllers/authController";
import { body } from "express-validator";

const authRouter = Router();

authRouter.get("/login", handleLogin);

authRouter.post(
  "/register",
  body("username")
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: false })
    .withMessage("username must be a e-mail"),
  body("password")
    .isLength({ min: 12 })
    .withMessage("password must be at least 12 chars long"),
  handleRegister
);

export default authRouter;
