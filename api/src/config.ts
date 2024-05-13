import { cleanEnv, port, str } from "envalid";
import dotenv from "dotenv";

dotenv.config();

const ENV = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ["development", "production", "test"] }),
  PORT: port(),
  MONGO_URI: str(),
  JWT_SECRET: str(),
});

export default ENV;
