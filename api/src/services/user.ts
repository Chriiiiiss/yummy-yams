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

export const retrieveUser = async (userId: string) => {
  try {
    return await User.findOne({ _id: userId }).then((user) => {
      if (!user) return null;
      return {
        username: user.username,
        partyLeft: user.partyLeft,
        prizesWon: user.prizesWon,
        currentPartyId: user.currentPartyId,
        email: user.email,
      };
    });
  } catch (err) {
    console.log("Error retrieving user: ", err);
    throw new Error("Error retrieving user");
  }
};

export const updateOneUserField = async (
  userId: string,
  fieldName: string,
  value: string
) => {
  try {
    await User.findOneAndUpdate({ _id: userId }, { [fieldName]: value });
  } catch (err) {
    console.log(`Error updating user ${fieldName}: `, err);
    throw new Error("Error updating user field");
  }
};
