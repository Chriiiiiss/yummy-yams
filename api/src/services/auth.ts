import ENV from "../config";
import { connectDatabase } from "../database/database";
import { IUser } from "../interfaces/user";
import User from "../models/userModel";
import bcrypt from "bcrypt";

import { Response } from "express";
import jwt from "jsonwebtoken";

export const loginServices = async (
  res: Response,
  userPayload: Pick<IUser, "email" | "password">
) => {
  connectDatabase("users").then(async () => {
    console.log(userPayload);
    try {
      User.findOne({ email: userPayload.email }).then(async (user) => {
        if (!user) return res.status(404).send("User not found");
        console.log(user);
        const isPasswordValid = await bcrypt.compare(
          userPayload.password,
          user.password
        );

        console.log(await bcrypt.compare(userPayload.password, user.password));

        if (!isPasswordValid) return res.status(401).send("Invalid password");

        const jwtToken = jwt.sign({ username: user.username }, ENV.JWT_SECRET, {
          expiresIn: "1h",
        });

        return res.status(200).send({ token: jwtToken });
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
        res.status(409).send("Email or Username already exists");
      } else {
        res.status(500).send("Internal server error");
      }
    }
  });
};
