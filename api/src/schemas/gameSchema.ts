import { Schema } from "mongoose";
import { IGame } from "../interfaces/game.ts";

export const gameSchema = new Schema<IGame>(
  {
    userId: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    shotLeft: { type: Number, default: 3 },
    isWon: { type: Boolean, default: false },
    prizeWon: { type: String, default: "" },
  },
  { collection: "game" }
);
