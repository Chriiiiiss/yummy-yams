import mongoose from "mongoose";
import ENV from "../config";

export const connectDatabase = async (databaseName: string | null) => {
  try {
    await mongoose.connect(`${ENV.MONGO_URI}${databaseName}`, {
      authSource: "admin",
    });
  } catch (error) {
    console.log(error);
  }
};
