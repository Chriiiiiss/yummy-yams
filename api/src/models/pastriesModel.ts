import mongoose from "mongoose";
import pastriesSchema from "src/schemas/pastriesSchema.ts";

const Pastries = mongoose.connection
  .useDb("pastries")
  .model("Pastries", pastriesSchema);

export default Pastries;
