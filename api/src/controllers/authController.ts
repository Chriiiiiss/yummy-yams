import { Request, Response } from "express";

import * as authService from "../services/authService";

export const handleLogin = (req: Request, res: Response) => {
  authService.handleDbLogin();
  return res.send("Login route works!");
};
