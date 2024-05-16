import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import ENV from "../config.ts";

export const verifyToken = (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    jwt.verify(token as string, ENV.JWT_SECRET);
    _next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid or expired token", code: 42 });
  }
};
