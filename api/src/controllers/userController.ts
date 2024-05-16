import { Request, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import ENV from "../config.ts";
import { DecodedJwt } from "../types/jwt.ts";
import { getUserService } from "../services/user.ts";
import mongoose from "mongoose";

export const handleFetchUserInfo = (req: Request, res: Response) => {
  try {
    const decodedToken = jwt.verify(
      req.params.token,
      ENV.JWT_SECRET
    ) as DecodedJwt;
    getUserService(decodedToken, res);
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(401).json({ message: "Invalid token" });
  }
};
