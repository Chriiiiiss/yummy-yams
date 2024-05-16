import { Request, Response } from "express";
import {
  decreaseGameShot,
  fetchGameById,
  saveAndUpdateGameRoll,
  setWinToGame,
  startGameService,
} from "../services/game.ts";
import { validationResult } from "express-validator";
import {
  addPastriesToUser,
  retrieveUser,
  updateOneUserField,
} from "src/services/user.ts";
import { findInStockPastries } from "src/services/pastries.ts";
import { WinType } from "src/interfaces/winType.ts";
import { IPastries } from "src/interfaces/pastries.ts";

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

const rollDices = (lockedDice: boolean[], oldRoll: number[]): number[] => {
  const newRoll = oldRoll.map((dice, index) => {
    if (lockedDice[index]) {
      return dice;
    }
    return Math.floor(Math.random() * 6) + 1;
  });

  return newRoll;
};

export const checkWin = (rollDices: number[]): WinType => {
  const counts = rollDices.reduce(
    (acc: { [key: number]: number }, val) => ({
      ...acc,
      [val]: (acc[val] || 0) + 1,
    }),
    {}
  );
  const countsArray = Object.values(counts);

  if (countsArray.includes(5)) {
    return WinType.Big;
  } else if (countsArray.includes(4)) {
    return WinType.Semi;
  } else if (countsArray.filter((item) => item === 2).length === 2) {
    return WinType.Small;
  }
  return WinType.Loose;
};

export const handleLaunchDice = async (req: Request, res: Response) => {
  const game = await fetchGameById(req.params.gameId);
  const user = await retrieveUser(req.body.userId);

  console.log("Game fetched: ", game);
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

  const oldRoll = game.savedRoll.length > 0 ? game.savedRoll : [1, 1, 1, 1, 1];
  const lockedDice =
    game.savedRoll.length > 0
      ? req.body.diceArray
      : [false, false, false, false, false];

  const rolledDice = rollDices(lockedDice, oldRoll);
  await saveAndUpdateGameRoll(req.params.gameId, rolledDice);

  const isWinner = checkWin(rolledDice);

  if (isWinner !== WinType.Loose) {
    console.log("Winner winner chicken dinner");
    const winnablePastries = await findInStockPastries();

    if (!winnablePastries) {
      return res
        .status(500)
        .json({ message: "No Pastries, Sorry Bro", code: 500 });
    }

    const wonPastrie = chooseOneRandomPastrie(winnablePastries)[0];

    await setWinToGame(req.params.gameId);

    if (!user) {
      throw new Error("User not found");
    }
    await addPastriesToUser(user._id, wonPastrie._id);
  }

  res.status(200).send({ message: "Dice launched", diceArray: rolledDice });
};

const chooseOneRandomPastrie = (pastries: any) => {
  const random = Math.floor(Math.random() * pastries.length);
  return [pastries[random]];
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
