import {
  IStartGamePayload,
  IStartGameResponse,
  IGameError,
} from "../interfaces/game.interface";

export const startGame = async (
  payload: IStartGamePayload
): Promise<IStartGameResponse> => {
  const response = await fetch(import.meta.env.VITE_API_URL + "/game/start", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${payload.token}`,
    },
    body: JSON.stringify({ token: payload.token }),
  });

  const data = await response.json();

  if (response.status !== 200 && response.status !== 301) {
    throw new IGameError(data.message, data.code);
  }

  return data;
};
