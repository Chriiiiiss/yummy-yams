export interface IStartGamePayload {
  token: string;
}

export interface IStartGameResponse extends IGameState {
  message: string;
}

export class IGameError extends Error {
  code: number;
  constructor(message: string, code?: number) {
    super(message);
    this.name = "IGameError";
    this.code = code || 0;
  }
}

export interface IGameState {
  gameId: string;
  shotLeft: number;
  isWon: boolean;
  prizeWon: string;
  setShotLeft: (value: number) => void;
  setIsWon: (value: boolean) => void;
  setPrizeWon: (value: string) => void;
  setGameId: (value: string) => void;
  reset: () => void;
}

export interface IFetchGameResponse {
  id: string;
  shotLeft: number;
  isWon: boolean;
  prizeWon: string;
}
