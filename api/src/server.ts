import express, {
  Express,
  Request,
  Response,
  NextFunction,
  Errback,
} from "express";
import authRouter from "./routers/authRouter";
import ENV from "./config";
import { connectDatabase } from "./database/database";
import { HttpError } from "./interfaces/error";

const PORT: number = ENV.PORT;

export const app: Express = express();

app.use(
  (err: Error, _req: Request, res: Response, _next: NextFunction): void => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  }
);
app.use(express.json());
app.use(authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment is ${ENV.NODE_ENV}`);
});
