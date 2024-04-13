import mongoose from "mongoose";
import ENV from "../config";

export const connectDatabase = async () => {
  try {
    await mongoose.connect(ENV.MONGO_URI);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
