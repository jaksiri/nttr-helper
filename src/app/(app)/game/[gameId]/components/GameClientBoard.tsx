"use client";
import React, { useEffect, useMemo, useState } from "react";
import { GameAction, GameLength, Job, WeekData } from "../types";
import { v4 as uuid } from "uuid";
import ScheduleDisplay from "./ScheduleDisplay";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import Checklist from "./Checklist";
import JobSelector from "./JobSelector";

type Props = {
  gameId: string;
  gameLength: GameLength;
};

export default function GameClientBoard({ gameId, gameLength }: Props) {
  // Data States
  const weeks = useMemo(
    () => initWeeksData(gameId, gameLength),
    [gameId, gameLength]
  );

  const [gameActions, setGameActions] = useState<GameAction[]>(
    new Array<GameAction>()
  );

  // Current States
  const [currentJob, setCurrentJob] = useState<Job>();

  const [currentWeek, setCurrentWeek] = useState<number>(0);

  useEffect(() => {
    setGameActions(initTaskData(gameId, gameLength));
    setCurrentJob(initCurrentJobData(gameId));
    setCurrentWeek(initCurrentWeekData(gameId));
  }, [gameId, gameLength]);

  // State Mutation Functions
  function addGameAction(gameAction: GameAction) {
    let newArr = [...gameActions];
    newArr.push(gameAction);
    setGameActions(newArr);
    localStorage.setItem(`nttr-tasks-${gameId}`, JSON.stringify(newArr));
  }

  function changeCurrentJob(job: Job) {
    setCurrentJob(job);
    localStorage.setItem(`nttr-currentJob-${gameId}`, JSON.stringify(job));
  }

  function changeCurrentWeek(week: number) {
    setCurrentWeek(week);
    localStorage.setItem(`nttr-currentWeek-${gameId}`, JSON.stringify(week));
  }

  function addGameActionOnWeek(week: number) {
    const gameAction: GameAction = {
      id: uuid(),
      weekId: weeks[week].id,
      type: "work",
      completed: false,
      notes: "Do Work",
    };
    addGameAction(gameAction);
  }

  return (
    <div className="w-full rounded grid grid-cols-10 grid-rows-4 gap-4">
      <div className="col-span-7">
        <ScheduleDisplay
          weeks={weeks}
          gameActions={gameActions}
          currentWeek={currentWeek}
          changeCurrentWeek={changeCurrentWeek}
        />
      </div>

      {/* right block */}
      <div className="flex flex-col gap-4 w-full col-span-3 row-span-4">
        <Checklist />
      </div>

      {/* left block */}
      <div className="col-span-7 space-y-4">
        <div className="flex flex-row gap-4">
          <Button onClick={() => changeCurrentWeek(currentWeek - 1)}>
            <Minus width={24} height={24} />
          </Button>
          <Button onClick={() => addGameActionOnWeek(currentWeek)}>
            Add Game Action to currentWeek
          </Button>
          <Button onClick={() => changeCurrentWeek(currentWeek + 1)}>
            <Plus width={24} height={24} />
          </Button>
        </div>
        <JobSelector
          currentJob={currentJob}
          changeCurrentJob={changeCurrentJob}
        />
      </div>
    </div>
  );
}

function initWeeksData(gameId: string, gameLength: GameLength) {
  // Find game on local storage, if exists, load it
  const weeksData = localStorage.getItem(`nttr-weeks-${gameId}`);
  if (weeksData) {
    console.log("Importing Week from Local Storage");
    return JSON.parse(weeksData);
  } else {
    // If not, create it
    console.log("Creating New Week Data Array");
    return createWeeksDataArray(gameId, gameLength);
  }
}

// Initial tasks for the game, (paying rent, etc)
function initTaskData(gameId: string, gameLength: GameLength) {
  const tasksData = localStorage.getItem(`nttr-tasks-${gameId}`);
  if (tasksData) {
    return JSON.parse(tasksData);
  } else {
    return createGameActionDataArray(gameId, gameLength);
  }
}

// Intialize Current Jobs Data
function initCurrentJobData(gameId: string) {
  const currentJobData = localStorage.getItem(`nttr-currentJob-${gameId}`);
  if (currentJobData) {
    return JSON.parse(currentJobData);
  } else {
    return undefined;
  }
}

// Initialize Current Week Data
function initCurrentWeekData(gameId: string) {
  const currentWeekData = localStorage.getItem(`nttr-currentWeek-${gameId}`);
  if (currentWeekData) {
    return JSON.parse(currentWeekData);
  } else {
    return 0;
  }
}

function createWeeksDataArray(
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

function createGameActionDataArray(
  gameId: string,
  gameLength: GameLength
): GameAction[] {
  const tasksData: GameAction[] = [];
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
    // TODO: Add initial tasks
  }

  localStorage.setItem(`nttr-tasks-${gameId}`, JSON.stringify(tasksData));

  return tasksData;
}
