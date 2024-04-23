import { connectDatabase } from "../database/database";
import { IUser } from "../interfaces/user";
import User from "../models/userModel";

import { Response } from "express";

export const loginServices = () => {
  console.log("Login route works!");
};

export const registerServices = (res: Response, userPayload: IUser) => {
  connectDatabase("users").then(async () => {
    try {
      await User.create({
        username: userPayload.username,
        password: userPayload.password,
      });
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
