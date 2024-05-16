import {
  IAuthResponse,
  IConnectionPayload,
} from "../interfaces/auth.interface";

export const loggingIn = async (
  connectionPayload: IConnectionPayload
): Promise<IAuthResponse> => {
  const response = await fetch(import.meta.env.VITE_API_URL + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(connectionPayload),
  });

  const data: IAuthResponse = await response.json();

  if ((response.status === 401 || response.status === 404) && data.message) {
    throw new Error(data.message);
  }
  return data;
};

export const registerUser = async (registerPayload: IConnectionPayload) => {
  const response = await fetch(
    import.meta.env.VITE_API_URL + "/auth/register",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerPayload),
    }
  );

  return await response.json();
};
