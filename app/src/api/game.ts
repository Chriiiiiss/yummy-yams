import {
  IStartGamePayload,
  IStartGameResponse,
} from "../interfaces/game.interface";

export const startGame = async (
  payload: IStartGamePayload
): Promise<IStartGameResponse> => {
  console.log(payload.token);
  const response = await fetch(import.meta.env.VITE_API_URL + "/game/start", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${payload.token}`,
    },
    body: JSON.stringify({ payload }),
  });

  if (response.status === 401) {
    throw new Error("Invalid or expired token");
  } else if (response.status !== 200) {
    throw new Error("Failed to start game");
  }

  return await response.json();
};
