export type GameLength = "short" | "medium" | "long" | "infinite";

export type WeekData = {
  id: string;
  weekNumber: number;
  gameId: string;
  data: Array<GameAction>;
};

export type GameAction = {
  id: string;
  weekId: string;
  type: GameActionType;
  completed: boolean;
  notes: string;
};

export type GameActionType =
  | "rent"
  | "food"
  | "entertainment"
  | "work"
  | "other"
  | "purchase";

export type Job = {
  id: string;
  name: string;
  income: number;
  location: string;
};