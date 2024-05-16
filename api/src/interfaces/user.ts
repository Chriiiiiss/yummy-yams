export interface IUser {
  username: string;
  email: string;
  password: string;
  partyLeft: number;
  prizesWon?: string[];
  _id: string;
  currentPartyId?: string;
}

export interface IUserTokenDecoded {
  username: string;
  partyLeft: number;
  userId: string;
  iat: number;
  exp: number;
}
