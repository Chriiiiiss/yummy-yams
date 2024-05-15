import { Router } from "express";
import { handleStartGame } from "../controllers/gameController";
import { body } from "express-validator";
import { verifyToken } from "../middleware/verifyToken";

export const gameRouter = Router();

gameRouter.use(verifyToken);
gameRouter.post(
  "/start",
  body("token").isString().withMessage("should provide a token"),
  handleStartGame
);
