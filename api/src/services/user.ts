import { Response } from "express";

import User from "../models/userModel.ts";
import { DecodedJwt } from "../types/jwt.ts";
import { saveWonPastries } from "./pastries.ts";
import Pastries from "src/models/pastriesModel.ts";

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
        _id: user._id,
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

export const addPastriesToUser = async (userId: string, pastriesId: string) => {
  console.log(`Adding ${pastriesId} to ${userId}`);
  try {
    await User.findOneAndUpdate(
      { _id: userId },
      { $push: { prizesWon: pastriesId } }
    );
    await saveWonPastries(pastriesId);
    console.log("Pastries added to user");
  } catch (err) {
    console.log("Error adding pastries to user: ", err);
    throw new Error("Error adding pastries to user");
  }
};

export const fetchUserWithPrizesAndPastriesInfo = async () => {
  try {
    return await User.where("prizesWon")
      .ne([])
      .then(async (users) => {
        const winners = await Promise.all(
          users.map(async (user) => {
            const pastries = await Pastries.find({
              _id: { $in: user.prizesWon },
            });
            return {
              username: user.username,
              pastries: pastries,
            };
          })
        );
        return winners;
      });
  } catch (err) {
    console.log("Error fetching winners: ", err);
    throw new Error("Error fetching winners");
  }
};
