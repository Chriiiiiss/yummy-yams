import ENV from "../config.ts";
import User from "../models/userModel.ts";
import jwt from "jsonwebtoken";
import { DecodedJwt } from "../types/jwt.ts";
import { Response } from "express";
import { IUser } from "../interfaces/user.ts";
import { Game } from "../models/gameModel.ts";
import { decreaseUserPartyLeft } from "./user.ts";

export const getUser = async (token: string, res: Response) => {
  const decodedToken = jwt.verify(token, ENV.JWT_SECRET) as DecodedJwt;

  try {
    return await User.findOne({ _id: decodedToken.userId }).then((user) => {
      return user;
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    return null;
  }
};

const isUserAbleToStartGame = (user: IUser) => {
  if (user.partyLeft <= 0 || user.currentPartyId !== "") {
    return false;
  }
  return true;
};

const createGameInstance = async (userId: string) => {
  try {
    return await Game.create({
      userId: userId,
      shotLeft: 3,
      isWon: false,
      prizeWon: 0,
    });
  } catch (error) {
    console.log("Error creating game instance: ", error);
    throw new Error("Error creating game instance");
  }
};

export const fetchGameById = async (gameId: string) => {
  try {
    return await Game.findOne({ _id: gameId }).then((game) => {
      if (!game) {
        throw new Error("Game not found");
      }
      return {
        id: game._id,
        shotLeft: game.shotLeft,
        isWon: game.isWon,
        prizeWon: game.prizeWon,
        savedRoll: game.savedRoll,
      };
    });
  } catch (error) {
    console.log("Error fetching game: ", error);
    throw new Error("Error fetching game");
  }
};

export const decreaseGameShot = async (gameId: string) => {
  try {
    return await Game.findOneAndUpdate(
      { _id: gameId },
      { $inc: { shotLeft: -1 } }
    );
  } catch (error) {
    console.log("Error decreasing game shot: ", error);
    throw new Error("Error decreasing game shot");
  }
};

export const startGameService = async (token: string, res: Response) => {
  const user = await getUser(token, res);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  console.log("User found... [", user.username, "]");

  const isUserAbleToStart = isUserAbleToStartGame(user);

  if (!isUserAbleToStart) {
    console.log("User is not able to start a game...");
    if (user.currentPartyId !== "") {
      console.log("USER CURRENT PARTY => ", user.currentPartyId);
      console.log("Fetching user game...");
      const game = await fetchGameById(user.currentPartyId as string);
      console.log("Game fetched, sending response...");
      return res
        .status(301)
        .json({ message: "User is already in a game", ...game });
    }
    return res
      .status(401)
      .json({ message: "User is not able to start a game", code: 41 });
  }
  console.log("User is able to start a game...");

  // Create a game instance
  console.log("Creating game...");
  const game = await createGameInstance(user._id);

  if (game) {
    console.log("Game created...", game);
    try {
      const isUserUpdated = await decreaseUserPartyLeft(
        user._id,
        game._id as unknown as string
      );
      return res.send({ message: "Game started", ...game });
      if (isUserUpdated) console.log("User party left updated...");
    } catch (error) {
      console.log("Error updating user party left: ", error);
      return res
        .status(500)
        .json({ message: "Error updating user party left", code: 500 });
    }
  } else {
    console.log("Error creating game...");
    return res.status(500).json({ message: "Error creating game", code: 500 });
  }
};

export const saveAndUpdateGameRoll = async (gameId: string, roll: number[]) => {
  try {
    return await Game.findOneAndUpdate({ _id: gameId }, { savedRoll: roll });
  } catch (error) {
    console.log("Error saving game roll: ", error);
    throw new Error("Error saving game roll");
  }
};

export const setWinToGame = async (gameId: string) => {
  try {
    return await Game.findOneAndUpdate({ _id: gameId }, { isWon: true });
  } catch (error) {
    console.log("Error setting game win: ", error);
    throw new Error("Error setting game win");
  }
};
