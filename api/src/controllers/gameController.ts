import { Request, Response } from "express";

export const handleStartGame = async (req: Request, res: Response) => {
  res.status(200).send({ message: "Game started" });
};
