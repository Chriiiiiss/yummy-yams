import { Request, Response } from "express";

import * as authService from "../services/authService";

export const handleLogin = (req: Request, res: Response) => {
  authService.loginServices();
  return res.send("Login route works!");
};

export const handleRegister = (req: Request, res: Response) => {
  authService.registerServices();
  return res.send("Registered");
};
