import { Request, Response } from "express";
import { validationResult } from "express-validator";

import * as authService from "../services/auth";

export const handleLogin = (req: Request, res: Response) => {
  authService.loginServices();
  return res.send("Login route works!");
};

export const handleRegister = (req: Request, res: Response) => {
  const validationErrorsResult = validationResult(req);
  if (!validationErrorsResult.isEmpty()) {
    const validationErrors = validationErrorsResult.array().map((error) => {
      if (error.type === "field") {
        return { field: error.path, message: error.msg };
      }
    });
    return res.status(400).json({ errors: validationErrors });
  }
  authService.registerServices(res, {
    username: req.body.username,
    password: req.body.password,
  });
};
