import { connectDatabase } from "../database/database";
import { IUser } from "../interfaces/user";
import User from "../models/userModel";
import bcrypt from "bcrypt";

import { Response } from "express";

export const loginServices = async (res: Response, userPayload: IUser) => {
  connectDatabase("users").then(async () => {
    try {
      User.findOne({ username: userPayload.username }).then(async (user) => {
        if (!user) return res.status(404).send("User not found");
        const isPasswordValid = await bcrypt.compare(
          userPayload.password,
          user.password
        );

        if (!isPasswordValid) return res.status(401).send("Invalid password");
        return res.status(200).send("Logged in");
      });
    } catch (err: any) {
      console.log(err);
    }
  });
  console.log("Login services works!");
};

async function encryptPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export const registerServices = (res: Response, userPayload: IUser) => {
  connectDatabase("users").then(async () => {
    try {
      await encryptPassword(userPayload.password).then((hashedPassword) => {
        userPayload.password = hashedPassword;
      });
      await User.create(userPayload);
      res.status(200).send("Registered");
    } catch (err: any) {
      if (err.name === "MongoServerError" && err.code === 11000) {
        res.status(409).send("User already exists");
      } else {
        res.status(500).send("Internal server error");
      }
    }
  });
};
