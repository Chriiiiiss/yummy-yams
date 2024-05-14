import {
  IAuthResponse,
  IConnectionPayload,
} from "../interfaces/auth.interface";

export const loggingIn = async (
  connectionPayload: IConnectionPayload
): Promise<IAuthResponse> => {
  const response = await fetch(import.meta.env.VITE_API_URL + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(connectionPayload),
  });

  if (!response.ok) {
    throw new Error("Error logging in");
  }

  const data: IAuthResponse = await response.json();

  return data;
};

export const registerUser = async (registerPayload: IConnectionPayload) => {
  const response = await fetch(import.meta.env.VITE_API_URL + "/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerPayload),
  });

  return await response.json();
};
