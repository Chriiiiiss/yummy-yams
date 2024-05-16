import { Schema } from "mongoose";
import { IUser } from "../interfaces/user.ts";

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true, minlength: 4 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 12 },
    partyLeft: { type: Number, default: 3 },
    prizesWon: { type: Array, default: [] },
    currentPartyId: { type: String, default: "" },
  },
  { collection: "user" }
);

export default userSchema;
