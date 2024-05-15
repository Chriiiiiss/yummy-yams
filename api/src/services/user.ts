import { Response } from "express";
import { connectDatabase } from "../database/database";
import User from "../models/userModel";
import { DecodedJwt } from "../types/jwt";

export const getUserService = (decodedToken: DecodedJwt, res: Response) => {
  connectDatabase("users").then(async () => {
    try {
      User.findOne({ _id: decodedToken.userId }).then((user) => {
        if (!user) return res.status(404).send({ message: "User not found" });
        return res.status(200).send({
          username: user.username,
          partyLeft: user.partyLeft,
          prizesWon: user.prizesWon,
        });
      });
    } catch (err: any) {
      return res.status(500).send({ message: "Internal server error" });
    }
  });
};
