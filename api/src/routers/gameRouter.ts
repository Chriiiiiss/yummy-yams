import { Router } from "express";
import {
  handleLaunchDice,
  handleStartGame,
} from "../controllers/gameController.ts";
import { body } from "express-validator";
import { verifyToken } from "../middleware/verifyToken.ts";
import { handleFetchGame } from "src/controllers/gameController.ts";

export const gameRouter = Router();

gameRouter.use(verifyToken);

gameRouter.post(
  "/start",
  body("token").isString().withMessage("should provide a token"),
  handleStartGame
);

gameRouter.get("/:gameId", handleFetchGame);

gameRouter.post("/:gameId/launchDice", handleLaunchDice);
