import { model } from "mongoose";
import userSchema from "../schemas/userSchema";
import { IUser } from "../interfaces/user";

const User = model<IUser>("User", userSchema);

export default User;
