import express, { Express } from "express";
import dotenv from "dotenv";
import authRouter from "./routers/authRouter";

dotenv.config();
const PORT: string | number = process.env.PORT ?? 3000;

const app: Express = express();

app.use(authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
