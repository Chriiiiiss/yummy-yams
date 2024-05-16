import mongoose from "mongoose";
import { IGame } from "../interfaces/game.ts";
import { gameSchema } from "../schemas/gameSchema.ts";

export const Game = mongoose.connection
  .useDb("games")
  .model("Game", gameSchema);
