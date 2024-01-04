import { ChecklistItem, GameAction, GameLength, WeekData } from "../types";
import { v4 as uuid } from "uuid";

export function initWeeksData(gameId: string, gameLength: GameLength) {
  // Find game on local storage, if exists, load it
  const weeksData = localStorage.getItem(`nttr-weeks-${gameId}`);
  if (weeksData) {
    return JSON.parse(weeksData);
  } else {
    // If not, create it
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

export function initChecklistData(gameId: string) {
  // Find game on local storage, if exists, load it
  const checklistData = localStorage.getItem(`nttr-checklist-${gameId}`);
  if (checklistData) {
    return JSON.parse(checklistData);
  } else {
    // If not, create it
    return createChecklistDataArray(gameId);
  }
}

export function createChecklistDataArray(gameId: string) {
  const checklistData: ChecklistItem[] = [];

  checklistData.push({
    id: uuid(),
    gameId: gameId,
    completed: false,
    text: "Get a job",
  });
  checklistData.push({
    id: uuid(),
    gameId: gameId,
    completed: false,
    text: "Enroll in a degree",
  });
  checklistData.push({
    id: uuid(),
    gameId: gameId,
    completed: false,
    text: "Check the news",
  });

  return checklistData;
}

export function initTasksData(gameLength: GameLength, weeks: WeekData[]) {
  // Find game on local storage, if exists, load it
  const tasksData = localStorage.getItem(`nttr-tasks-${gameLength}`);
  if (tasksData && tasksData?.length > 0) {
    return JSON.parse(tasksData);
  } else {
    // If not, create it
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
