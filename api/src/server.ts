import express, { Express } from "express";
import dotenv from "dotenv";

dotenv.config();
const PORT: string | number = process.env.PORT ?? 3000;

const app: Express = express();

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.get("/api", (_req, res) => {
  res.send("Hello API!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
