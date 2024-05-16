export interface IGame {
  userId: string;
  date: Date;
  shotLeft: number;
  isWon: boolean;
  prizeWon: string;
  savedRoll: number[];
}
