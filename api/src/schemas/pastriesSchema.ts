import { Schema } from "mongoose";
import { IPastries } from "src/interfaces/pastries.ts";

const pastriesSchema = new Schema<IPastries>(
  {
    name: { type: String, required: true, unique: true, minlength: 4 },
    image: { type: String, required: true },
    stock: { type: Number, required: true },
    quantityWon: { type: Number, default: 0 },
  },
  { collection: "winnablePastries" }
);

export default pastriesSchema;
