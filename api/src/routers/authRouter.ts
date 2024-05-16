import { Router } from "express";
import { handleLogin, handleRegister } from "../controllers/authController.ts";
import { body } from "express-validator";

const authRouter = Router();

authRouter.post(
  "/login",
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: false })
    .withMessage("username must be a e-mail"),
  body("password")
    .isLength({ min: 12 })
    .withMessage("password must be at least 12 chars long"),
  handleLogin
);

authRouter.post(
  "/register",
  body("username")
    .isLength({ min: 4 })
    .withMessage("username length must be at least 4 chars long"),
  body("password")
    .isLength({ min: 12 })
    .withMessage("password must be at least 12 chars long"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: false })
    .withMessage("email must be a e-mail"),
  handleRegister
);

export default authRouter;
