import { GameAction, GameLength, WeekData } from "../types";
import { v4 as uuid } from "uuid";

export function initWeeksData(gameId: string, gameLength: GameLength) {
  // Find game on local storage, if exists, load it
  const weeksData = localStorage.getItem(`nttr-weeks-${gameId}`);
  if (weeksData) {
    return JSON.parse(weeksData);
  } else {
    // If not, create it
    console.log("Creating New Week Data Array");
    return createWeeksDataArray(gameId, gameLength);
  }
}

export function createWeeksDataArray(
  gameId: string,
  gameLength: GameLength
): WeekData[] {
  const weeksData: WeekData[] = [];
  let numTurns = 0;
  switch (gameLength) {
    case "short":
      numTurns = 10;
      break;
    case "medium":
      numTurns = 20;
      break;
    case "long":
      numTurns = 30;
      break;
    case "infinite":
      numTurns = 100;
      break;
    default:
      throw new Error("Invalid game length");
  }

  for (let i = 0; i < numTurns; i++) {
    weeksData.push({
      id: uuid(),
      weekNumber: i + 1,
      gameId: gameId,
      data: new Array<GameAction>(),
    });
  }

  localStorage.setItem(`nttr-weeks-${gameId}`, JSON.stringify(weeksData));

  return weeksData;
}

export function initTasksData(gameLength: GameLength, weeks: WeekData[]) {
  // Find game on local storage, if exists, load it
  const tasksData = localStorage.getItem(`nttr-tasks-${gameLength}`);
  if (tasksData) {
    console.log("Importing Tasks from Local Storage");
    return JSON.parse(tasksData);
  } else {
    // If not, create it
    console.log("Creating New Tasks Data Array");
    return createGameActionDataArray(gameLength, weeks);
  }
}

export function createGameActionDataArray(
  gameLength: GameLength,
  weeks: WeekData[]
): GameAction[] {
  let tasksData: GameAction[] = [];
  let numTurns = 0;
  switch (gameLength) {
    case "short":
      numTurns = 10;
      break;
    case "medium":
      numTurns = 20;
      break;
    case "long":
      numTurns = 30;
      break;
    case "infinite":
      numTurns = 100;
      break;
    default:
      throw new Error("Invalid game length");
  }

  // Single Events

  // Reccurring Events
  for (let i = 1; i <= numTurns; i++) {
    if (i % 4 === 0 && i - 1 > 0) {
      // Rent
      tasksData.push({
        id: uuid(),
        weekId: weeks[i - 1].id,
        type: "rent",
        completed: false,
        notes: "",
      });
    }

    // Food
    tasksData.push({
      id: uuid(),
      weekId: weeks[i - 1].id,
      type: "food",
      completed: false,
      notes: "",
    });
  }

  return tasksData;
}
