import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import ENV from "../config.ts";
import { IUserTokenDecoded } from "src/interfaces/user.ts";

export const verifyToken = (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    const decodedJwt = jwt.verify(
      token as string,
      ENV.JWT_SECRET
    ) as IUserTokenDecoded;
    req.body.userId = decodedJwt.userId;
    _next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid or expired token", code: 42 });
  }
};
