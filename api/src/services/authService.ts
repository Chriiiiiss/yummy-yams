import mongoose, { MongooseError } from "mongoose";
import { connectDatabase } from "../database/database";
import User from "../models/userModel";
import { IMongooseError } from "../interfaces/error";

export const loginServices = () => {
  console.log("Login route works!");
};

export const registerServices = () => {
  const newUser = new User({ username: "Chris", password: "skjhdskjhk" });
  connectDatabase("users").then(async () => {
    try {
      await User.create({ username: "Chris", password: "root" });
    } catch (err: any) {
      if (err.name === "MongoServerError" && err.code === 11000) {
        console.log("User already exists");
      } else {
        console.log("Unhandled error");
      }
    }
  });
  console.log(newUser.username);
};
