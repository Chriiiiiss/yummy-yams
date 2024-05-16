import { Request, Response } from "express";
import {
  decreaseGameShot,
  fetchGameById,
  startGameService,
} from "../services/game.ts";
import { validationResult } from "express-validator";
import { updateOneUserField } from "src/services/user.ts";

export const handleStartGame = async (req: Request, res: Response) => {
  try {
    const validatorErrors = validationResult(req);

    if (!validatorErrors.isEmpty()) {
      return res.status(400).json({
        errors: validatorErrors.array(),
        message: "No token provided",
      });
    }
    await startGameService(req.body.token, res);
    // Start the game
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

export const handleFetchGame = async (req: Request, res: Response) => {
  if (!req.params.gameId) {
    return res.status(400).json({ message: "Game ID not provided" });
  }

  const game = await fetchGameById(req.params.gameId);

  if (!game) {
    return res.status(404).json({ message: "Game not found" });
  }

  res.status(200).json(game);
};

export const handleLaunchDice = async (req: Request, res: Response) => {
  try {
    const gameState = await decreaseGameShot(req.params.gameId);

    if (gameState && gameState.shotLeft <= 0) {
      return res.status(401).json({ message: "No more shot left", code: 401 });
    }

    if (!gameState) {
      return res.status(404).json({ message: "Game not found", code: 404 });
    }

    console.log(
      `Decrementing game shot, previously it was : ${
        gameState.shotLeft
      } now it is ${gameState.shotLeft - 1}`
    );
  } catch (err) {
    console.log("Error decreasing game shot: ", err);
    return res.status(500).json({ message: "Internal server error" });
  }

  // Launch the dice
  res
    .status(200)
    .send({ message: "Dice launched", diceArray: [1, 2, 3, 4, 5] });
};

export const handleQuitGame = async (req: Request, res: Response) => {
  console.log("Removing currentPartyId from user");

  try {
    await updateOneUserField(req.body.userId, "currentPartyId", "");
  } catch (err) {
    console.log("Error quitting game: ", err);
    return res
      .status(500)
      .json({ message: "Internal server error", code: 500 });
  }

  res.status(200).json({ message: "Game quit" });
};
