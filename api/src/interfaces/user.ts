export interface IUser {
  username: string;
  email: string;
  password: string;
  partyLeft: number;
  prizesWon?: string[];
  _id: string;
  currentPartyId?: string;
}
