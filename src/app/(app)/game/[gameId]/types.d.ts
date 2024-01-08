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
  | "relax"
  | "work"
  | "other"
  | "purchase"
  | "education"
  | "";

export type Job = {
  id: string;
  name: string;
  income: number;
  location: string;
  experienceRequired: number;
};

export type ChecklistItem = {
  id: string;
  gameId: string;
  text: string;
  completed: boolean;
};
