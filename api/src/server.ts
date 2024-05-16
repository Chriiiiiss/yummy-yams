import express, { Express, Request, Response, NextFunction } from "express";
import authRouter from "./routers/authRouter.ts";
import ENV from "./config.ts";
import cors from "cors";
import userRouter from "./routers/userRouter.ts";
import mongoose, { Connection } from "mongoose";
import { gameRouter } from "./routers/gameRouter.ts";

const PORT: number = ENV.PORT;

export const app: Express = express();

mongoose.connect(`${ENV.MONGO_URI}`, { authSource: "admin" });

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use(
  (err: Error, _req: Request, res: Response, _next: NextFunction): void => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  }
);
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/game", gameRouter);

app.listen(PORT, async () => {
  console.log(`Server  running on port ${PORT}`);
  console.log(`Environment is ${ENV.NODE_ENV}`);
});
