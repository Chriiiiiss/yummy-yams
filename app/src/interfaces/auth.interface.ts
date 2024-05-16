export interface IConnectionPayload {
  email: string;
  password: string;
}

export interface IAuthResponse {
  message: string;
  token?: string;
}

export interface APIError extends Error {
  message: string;
}

export interface UserState {
  token: string | null;
  username: string;
  partyLeft: number;
  prizeWon: string[];
  isConnected: boolean;
  currentPartyId: string;
  setCurrentPartyId: (value: string) => void;
  setIsConnected: (value: boolean) => void;
  setToken: (value: string) => void;
  setUsername: (value: string) => void;
  setPartyLeft: (value: number) => void;
  setPrizeWon: (value: string[]) => void;
  reset: () => void;
}
