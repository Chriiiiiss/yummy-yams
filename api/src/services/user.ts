import { Response } from "express";

import User from "../models/userModel.ts";
import { DecodedJwt } from "../types/jwt.ts";

export const getUserService = (decodedToken: DecodedJwt, res: Response) => {
  try {
    User.findOne({ _id: decodedToken.userId }).then((user) => {
      if (!user) return res.status(404).send({ message: "User not found" });
      return res.status(200).send({
        username: user.username,
        partyLeft: user.partyLeft,
        prizesWon: user.prizesWon,
        currentPartyId: user.currentPartyId,
      });
    });
  } catch (err: any) {
    return res.status(500).send({ message: "Internal server error" });
  }
};

export const decreaseUserPartyLeft = async (userId: string, gameId: string) => {
  try {
    const userUpdated = await User.findOneAndUpdate(
      { _id: userId },
      { $inc: { partyLeft: -1 }, currentPartyId: gameId }
    );

    console.log("User updated: ", userUpdated);
    return true;
  } catch (err) {
    console.log("Error setting party left: ", err);
    throw new Error("Error setting party left");
  }
};
