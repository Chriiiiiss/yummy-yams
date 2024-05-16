import mongoose, { model } from "mongoose";
import userSchema from "../schemas/userSchema.ts";
import { IUser } from "../interfaces/user.ts";

const User = mongoose.connection
  .useDb("users")
  .model<IUser>("User", userSchema);

export default User;
