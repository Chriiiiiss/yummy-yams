import { Connection, Model } from "mongoose";
import { IGame } from "./game.ts";
import { IUser } from "./user.ts";

export interface IDbConnection {
  userDb: Connection;
  gameDb: Connection;
  pastriesDb: Connection;
}

export interface IModels {
  User: Model<IUser>;
  Game: Model<IGame>;
}
